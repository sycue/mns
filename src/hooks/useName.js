import React from "react";
import MetaMaskOnboarding from "@metamask/onboarding";
import { queryContract, invokeContract, web3 } from "./useWeb3";
import { toLower } from "lodash";
import deploy from "../configs/deploy.json";
import abi from "../configs/MNS.abi.json";

const { MNSAddress: address } = deploy;

/*
if (typeof window === "undefined") {
  var window = {};
}
*/

function queryName(method, args = []) {
  return queryContract({ abi, address, method, args });
}

function invokeName(method, args = []) {
  return invokeContract({ abi, address, method, args });
}

const initialState = {
  selectedAddress:
    typeof window !== "undefined" && window?.ethereum?.selectedAddress,
  error: null
};

const NameContext = React.createContext(initialState);

function nameReducer(state, action) {
  switch (action.type) {
    case "connect":
      return { ...state, account: action.account };
    case "current":
      return { ...state, user: action.user, company: action.company };
    case "logout":
      return initialState;
    default:
      throw new Error("Invalid action");
  }
}

export function NameProvider({ children }) {
  const [state, dispatch] = React.useReducer(nameReducer, initialState);

  return (
    <NameContext.Provider value={{ state, dispatch }}>
      {children}
    </NameContext.Provider>
  );
}

export function useName() {
  return React.useContext(NameContext);
}

//Created check function to see if the MetaMask extension is installed
export const isMetaMaskInstalled = () => {
  //Have to check the ethereum binding on the window object to see if it's installed
  const { ethereum } = window;
  return Boolean(ethereum && ethereum.isMetaMask);
};

export const onClickConnect = async () => {
  try {
    // Will open the MetaMask UI
    // You should disable this button while the request is pending!
    const accounts = await window.ethereum?.request({
      method: "eth_requestAccounts"
    });
    console.log("accounts", accounts);
    return accounts;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const ONBOARD_TEXT = "Install MetaMask";
export const CONNECT_TEXT = "Connect";
export const CONNECTED_TEXT = "Connected";

export const useConnect = () => {
  const [buttonText, setButtonText] = React.useState(ONBOARD_TEXT);
  const [isDisabled, setDisabled] = React.useState(false);
  const [accounts, setAccounts] = React.useState([]);
  const onboarding = React.useRef();

  React.useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  React.useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accounts.length > 0) {
        setButtonText(CONNECTED_TEXT);
        setDisabled(true);
        onboarding.current.stopOnboarding();
      } else {
        setButtonText(CONNECT_TEXT);
        setDisabled(false);
      }
    }
  }, [accounts]);

  React.useEffect(() => {
    function handleNewAccounts(newAccounts) {
      setAccounts(newAccounts);
    }
    if (
      typeof window !== "undefined" &&
      MetaMaskOnboarding.isMetaMaskInstalled()
    ) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(handleNewAccounts);
      window.ethereum.on("accountsChanged", handleNewAccounts);
      return () => {
        if (window.ethereum.off) {
          window.ethereum.off("accountsChanged", handleNewAccounts);
        }
      };
    }
  }, []);

  const onClick = () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(newAccounts => setAccounts(newAccounts));
    } else {
      onboarding.current.startOnboarding();
    }
  };

  return { accounts, isDisabled, buttonText, onClick };
};

export const sendTransaction = async () => {
  const transactionParameters = {
    nonce: "0x00", // ignored by MetaMask
    gasPrice: "0x09184e72a000", // customizable by user during MetaMask confirmation.
    gas: "0x2710", // customizable by user during MetaMask confirmation.
    to: "0x0000000000000000000000000000000000000000", // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    value: "0x00", // Only required to send ether to the recipient from the initiating external account.
    data: "0x7f7465737432000000000000000000000000000000000000000000000000000000600057", // Optional, but used for defining smart contract creation and interaction.
    chainId: "0x3" // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
  };

  // txHash is a hex string
  // As with any RPC call, it may throw an error
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters]
  });

  return txHash;
};

export function getSelectedAddress() {
  return window.ethereum?.selectedAddress;
}

export function isOwner(owner) {
  console.log("isOwner", owner, window.ethereum?.selectedAddress);
  return owner && toLower(owner) === toLower(window.ethereum?.selectedAddress);
}

export function isExpired(expiryTime) {
  return parseInt(expiryTime) * 1000 < Date.now();
}

export function canRegister(data) {
  return !(data.exists && !isExpired(data.expiryTime));
}

export function useFetchName(name) {
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!name) return;

    async function fetchName() {
      const _tokenId = await queryName("getTokenId", [name]);
      const tokenId = web3.utils.numberToHex(_tokenId);
      const exists = await queryName("exists", [tokenId]);
      let [owner, expiryTime, tokenURI] = ["", 0, ""];
      if (exists) {
        owner = await queryName("ownerOf", [tokenId]);
        expiryTime = await queryName("recordTTL", [tokenId]);
        tokenURI = await queryName("tokenURI", [tokenId]);
      }
      setData({ name, tokenId, exists, owner, expiryTime, tokenURI });
      setLoading(false);
    }

    fetchName();
  }, [name]);

  return { data, setData, loading };
}

export function useFetchOwnedNames() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const owner = window.ethereum.selectedAddress;
    if (!owner) {
      setLoading(false);
      return;
    }

    async function fetchNames() {
      const balance = await queryName("balanceOf", [owner]);
      let names = [];
      for (let i = 0; i < balance; i++) {
        const tokenId = await queryName("tokenOfOwnerByIndex", [owner, i]);
        const expiryTime = await queryName("recordTTL", [tokenId]);
        const name = await queryName("recordName", [tokenId]);
        names.push({ tokenId, name, expiryTime });
      }

      setData(names);
      setLoading(false);
    }

    fetchNames();
  }, []);

  return { data, loading };
}

export function useRegisterName(name) {
  const [tx, setTx] = React.useState({});
  const [state, setState] = React.useState("init");
  const register = async e => {
    e.preventDefault();
    setState("loading");
    const tx = await invokeName("register", [name]);
    console.log("register", tx);
    setTx(tx);
    setState("success");
  };

  return { register, state, tx };
}

export function useSetTokenURI(tokenId, cb) {
  const [tx, setTx] = React.useState({});
  const [state, setState] = React.useState("init");
  const submit = async data => {
    setState("loading");
    const tx = await invokeName("setTokenURI", [tokenId, data.tokenURI]);
    console.log("setTokenURI", tx);
    setTx(tx);
    setState("success");
    cb(data);
  };

  return { submit, state, tx };
}

export function useRenew(tokenId, cb) {
  const [tx, setTx] = React.useState({});
  const [state, setState] = React.useState("init");
  const submit = async e => {
    e.preventDefault();
    setState("loading");
    const tx = await invokeName("renew", [tokenId]);
    console.log("renew", tx);
    setTx(tx);
    setState("success");
    cb();
  };

  return { submit, state, tx };
}

export function useTransfer(tokenId, cb) {
  const [tx, setTx] = React.useState({});
  const [state, setState] = React.useState("init");
  const submit = async data => {
    setState("loading");
    const to = data.owner;
    const tx = await invokeName("transfer", [to, tokenId]);
    console.log("transfer", tx);
    setTx(tx);
    setState("success");
    cb(data);
  };

  return { submit, state, tx };
}

export function useBurn(tokenId, cb) {
  const [tx, setTx] = React.useState({});
  const [state, setState] = React.useState("init");
  const submit = async e => {
    e.preventDefault();
    setState("loading");
    const tx = await invokeName("burn", [tokenId]);
    console.log("burn", tx);
    setTx(tx);
    setState("success");
    cb();
  };

  return { submit, state, tx };
}
