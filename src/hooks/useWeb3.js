import { useState, useCallback } from "react";
import Web3 from "web3";
import config from "../configs/default";

export const web3 = new Web3(config.rpcurl);

export const send = async params => {
  /*
  const transactionParameters = {
    nonce: "0x00", // ignored by MetaMask
    gasPrice: "0x09184e72a000", // customizable by user during MetaMask confirmation.
    gas: "0x2710", // customizable by user during MetaMask confirmation.
    to: "0x0000000000000000000000000000000000000000", // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    value: "0x00", // Only required to send ether to the recipient from the initiating external account.
    data:
      "0x7f7465737432000000000000000000000000000000000000000000000000000000600057", // Optional, but used for defining smart contract creation and interaction.
    chainId: "0x3", // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
  };
  */
  const transactionParameters = {
    ...params,
    from: window.ethereum.selectedAddress // must match user's active address.
  };

  // txHash is a hex string
  // As with any RPC call, it may throw an error
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters]
  });

  console.log("send transaction", txHash);

  return txHash;
};

export function getSelectedAddress() {
  return window.ethereum?.selectedAddress;
}

export async function invokeContract({ abi, address, method, args, ...rest }) {
  const contract = new web3.eth.Contract(abi, address);
  const data = contract.methods[method](...args).encodeABI();
  const tx = await send({ data, to: address, ...rest });
  return tx;
}

export async function queryContract({ abi, address, method, args }) {
  const contract = new web3.eth.Contract(abi, address);
  const value = await contract.methods[method](...args).call();
  return value;
}

export function useQuery({ abi, address, defaults }) {
  const [data, setData] = useState(defaults);
  const [state, setState] = useState("init");

  const query = useCallback(
    async ({ method, args = [] }) => {
      setState("loading");
      const result = await queryContract({ abi, address, method, args });
      setData(result);
      setState("success");
      return result;
    },
    [abi, address]
  );

  return { data, setData, state, setState, query };
}

export function useInvoke({ abi, address, defaults, cb }) {
  const [data, setData] = useState(defaults);
  const [state, setState] = useState("init");

  const submit = async ({ method, args = [] }) => {
    setState("loading");
    const tx = await invokeContract({ abi, address, method, args });
    setData(tx);
    setState("success");
    if (cb) cb();
    return tx;
  };

  return { data, setData, state, setState, submit };
}
