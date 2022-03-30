// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MNS is Context, Ownable, ERC721Burnable, ERC721Enumerable, ERC721URIStorage {
    struct Record {
        address owner;
        string name;
        uint256 ttl;
        address resolver;
    }

    mapping(uint256 => Record) records;
    // uint256 private _renewPeriod = 365 days;
    uint256 private _renewPeriod = 5 minutes;

    constructor() ERC721("MetaName", "MNS") {}

    modifier onlyTokenOwner(uint256 tokenId) {
        require(_isApprovedOrOwner(_msgSender(), tokenId), "MNS: caller is not owner nor approved");
        _;
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function setRenewPeriod(uint256 renewPeriod) public onlyOwner {
        _renewPeriod = renewPeriod;
    }

    function getRenewPeriod() public view returns (uint256) {
        return _renewPeriod;
    }

    function register(string memory name) public returns (uint256) {
        require(validateName(name), "MNS: name format error, only allows a-z,0-9,-");

        uint256 tokenId = getTokenId(name);

        require(records[tokenId].ttl < block.timestamp, "MNS: name currently registered");

        if (_exists(tokenId)) {
            _burn(tokenId);
        }

        records[tokenId].name = name;
        records[tokenId].ttl = block.timestamp + _renewPeriod;
        records[tokenId].owner = _msgSender();
        _safeMint(_msgSender(), tokenId);

        return tokenId;
    }

    function renew(uint256 tokenId) public onlyTokenOwner(tokenId) {
        uint256 ttl = records[tokenId].ttl;
        require(ttl < (block.timestamp + _renewPeriod), "MNS: already renewed");

        if (ttl < block.timestamp) {
            records[tokenId].ttl = block.timestamp + _renewPeriod;
        } else {
            records[tokenId].ttl = ttl + _renewPeriod;
        }
    }

    function transfer(address to, uint256 tokenId) public onlyTokenOwner(tokenId) {
        safeTransferFrom(_msgSender(), to, tokenId);
    }

    function setTokenURI(uint256 tokenId, string memory _tokenURI) public onlyTokenOwner(tokenId) {
        _setTokenURI(tokenId, _tokenURI);
    }

    function setResolver(uint256 tokenId, address resolver) public onlyTokenOwner(tokenId) {
        records[tokenId].resolver = resolver;
    }

    function tokenURI(uint256 tokenId) public view virtual override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function recordName(uint256 tokenId) public view returns (string memory) {
        return records[tokenId].name;
    }

    function recordTTL(uint256 tokenId) public view returns (uint256) {
        return records[tokenId].ttl;
    }

    function recordResolver(uint256 tokenId) public view returns (address) {
        return records[tokenId].resolver;
    }

    function getTokenId(string memory name) public pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(name)));
    }

    function exists(uint256 tokenId) public view returns (bool) {
        return _exists(tokenId);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        virtual
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
        records[tokenId].owner = to;
    }

    function _burn(uint256 tokenId) internal virtual override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);

        if (records[tokenId].owner != address(0)) {
            delete records[tokenId];
        }
    }

    function validateName(string memory str) public pure returns (bool) {
        bytes memory b = bytes(str);
        if (b.length > 80) return false;

        for (uint i; i<b.length; i++) {
            bytes1 char = b[i];

            if (!(char >= 0x30 && char <= 0x39) && //0-9
                !(char >= 0x61 && char <= 0x7A) && //a-z
                !(char == 0x2D) // -
               ) {
                return false;
            }
        }

        return true;
    }
}

