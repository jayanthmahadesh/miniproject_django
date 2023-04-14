const networkConfig = {
  11155111: {
    name: "sepolia",
    ethUsdpriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
  },
};
const developmentChains = ["hardhat", "localhost"];
const decimal = 8;
const initalanswers = 200000000000;
module.exports = {
  networkConfig,
  developmentChains,
  decimal,
  initalanswers,
};
