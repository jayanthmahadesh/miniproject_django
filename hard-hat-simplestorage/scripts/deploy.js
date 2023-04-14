//imports

const { ethers, run, network } = require("hardhat");

//async main
async function main() {
  const SimpleStorageFacotry = await ethers.getContractFactory("SimpleStorage");
  console.log("deploying .....................");
  const simpleStorage = await SimpleStorageFacotry.deploy();
  await simpleStorage.deployed();
  console.log(`deployed contract to ${simpleStorage.address}`);
  // console.log(network.config);
  // console.log(`chain id ${network.config.chainId}`);
  // console.log(`ether scan api ${process.env.ETHER_SCAN_APIKEY}`);
  if (network.config.chainId === 11155111 && process.env.ETHER_SCAN_APIKEY) {
    console.log("waiting for transaction .....(6)");
    await simpleStorage.deployTransaction.wait(6);

    await verify(simpleStorage.address, []);
  }
  const currentValue = await simpleStorage.retrieve();
  console.log(`current value is ${currentValue}`);

  //update currentvalue
  const transactionResponse = await simpleStorage.store(7);
  await transactionResponse.wait(1);
  const updatedValue = await simpleStorage.retrieve();
  console.log(`UPDATED VALUE = ${updatedValue}`);
}
async function verify(contractAddress, args) {
  console.log("verifying contract ......");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowercase().includes("already verified")) {
      console.log("already verified");
    } else console.log(e);
  }
}
//calling main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
