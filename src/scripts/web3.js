const Web3 = require("web3");

exports.newWeb3 = newWeb3;
function newWeb3(url, privateUrl) {
  const web3 = new Web3(url);
  web3.eth.handleRevert = true;
  return web3;
}

exports.send = send;
async function send({
  web3,
  account,
  password = "",
  to = "",
  data,
  value = 0
  // gasPrice = 0
  // gasLimit = 9300000,
}) {
  web3.eth.handleRevert = true;
  try {
    const from = web3.eth.accounts.decrypt(account, password);
    const nonce = await web3.eth.getTransactionCount(from.address);
    // const gasLimit = await web3.eth.estimateGas({ data });
    // var block = await web3.eth.getBlock("latest");
    // const gasLimit = block.gasLimit;
    // console.log("gasLimit", block);
    const gasLimit = web3.utils.toHex(4000000);
    const maxPriorityFeePerGas = 40000000000;
    let tx = null;
    let params = { gasLimit, maxPriorityFeePerGas, nonce, to, value, data };

    let sign = await web3.eth.accounts.signTransaction(params, from.privateKey);
    console.log("sign", sign.rawTransaction);
    tx = await web3.eth.sendSignedTransaction(sign.rawTransaction);
    return tx;
  } catch (e) {
    const reason = await getRevertReason(web3, e);
    console.log(reason);
    throw new Error(e.message);
  }
}

exports.getRevertReason = getRevertReason;
async function getRevertReason(web3, error) {
  const txHash = error.receipt?.transactionHash;
  if (txHash) {
    const tx = await web3.eth.getTransaction(txHash);
    const result = await web3.eth.call(tx, tx.blockNumber);
    const code = result ? result.substr(138) : "";
    if (result && code) {
      const reason = web3.utils.toAscii("0x" + code);
      console.log("Revert reason:", reason);
      return " Revert reason: " + reason;
    } else {
      console.log("Cannot get reason - No return value");
    }
  }
  return "";
}

exports.deploy = deploy;
async function deploy({ web3, abi, bytecode, args, ...rest }) {
  const params = { data: bytecode, arguments: args };
  const contract = new web3.eth.Contract(abi);
  const data = contract.deploy(params).encodeABI();
  const tx = await send({ web3, data, ...rest });
  return tx;
}

exports.invoke = invoke;
async function invoke({ web3, abi, address, method, args, ...rest }) {
  const contract = new web3.eth.Contract(abi, address);
  const data = contract.methods[method](...args).encodeABI();
  const tx = await send({ web3, data, to: address, ...rest });
  return tx;
}

exports.query = query;
async function query({ web3, abi, address, method, args }) {
  const contract = new web3.eth.Contract(abi, address);
  const value = await contract.methods[method](...args).call();
  return value;
}
