// function deployFunc(hre) {
//   console.log("hi ...");
// Hre.getNamedAccounts();
// hre.deployments;
// }
// module.exports.default = deployFunc;

// modules.exports = async (hre) => {
//   const { getNamedAccounts, deployments } = hre;
// };
require("dotenv").config();
const {
  networkConfig,
  developmentChains,
} = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");
const { network } = require("hardhat");
const ChainId = network.config.chainId;
module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  // const ehtUsdpriceFeedaddress = networkConfig[ChainId]["ethUsdpriceFeed"];
  let ethUsdpriceFeedaddress;
  if (developmentChains.includes(network.name)) {
    const ethUsdAggregator = await deployments.get("MockV3Aggregator");
    ethUsdpriceFeedaddress = ethUsdAggregator.address;
  } else {
    console.log("here one");
    ethUsdpriceFeedaddress = networkConfig[ChainId]["ethUsdpriceFeed"];
  }
  console.log(`price feed address = ${ethUsdpriceFeedaddress}`);
  const fundMe = await deploy("FundMe", {
    from: deployer,
    args: [ethUsdpriceFeedaddress],
    log: true,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: network.config.blockConfirmations || 1,
  });
  console.log("_______________________");
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHER_SCAN_APIKEY
  ) {
    console.log("inside verification");
    await verify(fundMe.address, [ethUsdpriceFeedaddress]);
  }
};

module.exports.tags = ["all", "fundme"];
