const fs = require("fs");
const path = require("path");

function writeJson(file, data, space = 2) {
  fs.writeFileSync(file, JSON.stringify(data, null, space));
}

function readJson(file) {
  if (!fs.existsSync(file)) return {};
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

const deployFile = path.join(__dirname, "../configs/deploy.json");

const deployConfig = {
  set(key, val) {
    const data = readJson(deployFile);
    data[key] = val;
    writeJson(deployFile, data);
  },

  get(key) {
    const data = readJson(deployFile);
    return data[key];
  }
};

const keyFile = path.join(__dirname, "../../key.json");

if (!fs.existsSync(keyFile)) {
  throw new Error("Account file not found: " + keyFile);
}

const account = JSON.parse(fs.readFileSync(keyFile));

module.exports = {
  // rpcurl: "http://localhost:22001",
  rpcurl: "http://localhost:15451",
  password: "",
  account,
  deployConfig
};
