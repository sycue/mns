const config = require("./config");
const { newWeb3, send } = require("./web3");

async function sendEth() {
  const { rpcurl, account, password } = config;
  const web3 = newWeb3(rpcurl);
  const to = "0x7eC3A2b8562D48A9e6929E9C69b19a1131E0F843";
  const value = "1000000" + "000000000000000000";
  const tx = await send({ web3, account, password, to, value });
  console.log(tx);
}

sendEth();
