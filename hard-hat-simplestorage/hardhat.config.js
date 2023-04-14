require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("./tasks/block-number");
/** @type import('hardhat/config').HardhatUserConfig */
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHER_SCAN_APIKEY = process.env.ETHER_SCAN_APIKEY;
// console.log(SEPOLIA_RPC_URL);
// console.log(PRIVATE_KEY);
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
    },
    localhot: {
      url: "http://127.0.0.1:8545/",
      // accounts: default placed
      chainId: 31337,
    },
  },
  solidity: "0.8.7",

  // to verify automatically
  etherscan: {
    apiKey: ETHER_SCAN_APIKEY,
  },
};
