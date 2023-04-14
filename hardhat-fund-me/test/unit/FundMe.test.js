const { deployments, ethers, getNamedAccounts } = require("hardhat");
describe("FundMe", async function () {
  let fundMe;
  let deployer;
  beforeEach(async function () {
    //deploy contract on hardhat
    deployer = (await getNamedAccounts()).deployer;
    await deployments(["all"]);
    fundMe = await ethers.getContract("FundMe", deployer);
  });
  describe("constructor", async function () {});
});
