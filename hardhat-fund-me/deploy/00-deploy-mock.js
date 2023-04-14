const { network } = require("hardhat");
const {
  developmentChains,
  decimal,
  initalanswers,
} = require("../helper-hardhat-config");
module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  //   console.log(`network name = ${network.name}`);
  if (developmentChains.includes(network.name)) {
    log("local netword detected! Deploytin mocks....");
    await deploy("MockV3Aggregator", {
      contract: "MockV3Aggregator",
      from: deployer,
      log: true,
      args: [decimal, initalanswers],
    });
    console.log("mocks deployed!");
    console.log("__________________________");
  }
};
module.exports.tags = ["all", "mocks"];
