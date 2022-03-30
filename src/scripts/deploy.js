const fs = require("fs");
const path = require("path");
const config = require("./config");
const { newWeb3, deploy, invoke, query } = require("./web3");
const BigNumber = require("bignumber.js");

function newBN(data) {
  if (data) {
    return new BigNumber(data);
  } else {
    return new BigNumber(0);
  }
}

function fromBN(data) {
  const decimals = newBN(10).pow(18);
  return newBN(data).dividedBy(decimals).toString();
}

function toBN(data) {
  const decimals = newBN(10).pow(18);
  return newBN(data).multipliedBy(decimals).toString();
}

function printBN(result) {
  console.log("printBN:", fromBN(result));
}

function getAddress(name) {
  const address = config.deployAddress.get(name);
  if (!address) throw new Error(`empty ${name} address`);
  return address;
}

// contracts_MNS_sol_MNS.abi
function getABI(name) {
  const abi = fs.readFileSync(
    path.join(__dirname, `../../build/contracts/${name}.abi`)
  );
  if (!abi) throw new Error(`empty ${name} abi`);
  return JSON.parse(abi);
}

// contracts_MNS_sol_MNS.abi
function getBIN(name) {
  const bin = fs
    .readFileSync(path.join(__dirname, `../../build/contracts/${name}.bin`))
    .toString();
  if (!bin) throw new Error(`empty ${name} bin`);
  return bin;
}

async function contractDeploy({ name, args = [] }) {
  const { rpcurl, account, password, deployConfig } = config;
  const abi = getABI(name);
  const bytecode = getBIN(name);
  const web3 = newWeb3(rpcurl);
  const tx = await deploy({ web3, abi, bytecode, args, account, password });
  deployConfig.set(name + "_address", tx.contractAddress);
  deployConfig.set(name + "_abi", abi);
  console.log("contract address: ", name, tx.contractAddress);
}

function contractParams(name) {
  const { rpcurl, account, password } = config;
  const address = getAddress(name);
  const abi = getABI(name);
  const web3 = newWeb3(rpcurl);
  return { web3, abi, address, account, password };
}

function contractInvoke(name, method, args = []) {
  const params = contractParams(name);
  invoke({ ...params, method, args });
}

async function contractQuery(name, method, args = []) {
  const params = contractParams(name);
  const result = await query({ ...params, method, args });
  console.log("contractQuery", name, method, result);
  return result;
}

/* =============== MNS ============== */

function deployMNS() {
  const args = [];
  contractDeploy({ name: "contracts_MNS_sol_MNS", args });
}

let args = process.argv.slice(2);
console.log("args: ", args);

switch (args[0]) {
  case "deployMNS":
    deployMNS();
    break;

  default:
    console.log("Sorry, that is not something I know how to do.");
}
