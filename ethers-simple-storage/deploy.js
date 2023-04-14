const ethers = require("ethers");
const fs = require("fs-extra"); //used for reading from .abi file and .bin file

require("dotenv").config();

async function main() {
  // http://127.0.0.1:7545
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  // const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf-8");
  // let wallet = new ethers.Wallet.fromEncryptedJsonSync(
  //   encryptedJson,
  //   process.env.PRIVATE_KEY_PASSWORD
  // );
  // wallet = await wallet.connect(provider);
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf-8"
  );
  const contractFacotry = new ethers.ContractFactory(abi, binary, wallet);
  console.log("deploying please wait ...");
  const contract = await contractFacotry.deploy();
  // console.log(contract);
  await contract.deployTransaction.wait(1);
  console.log(`contract address = ${contract.address}`);
  const currentFavoriteNumber = await contract.retrieve();
  console.log(`current favorite number : ${currentFavoriteNumber.toString()}`);
  const transactionResponse = await contract.store("7");
  const trasactinoreceipt = await transactionResponse.wait(1);
  const updatedFavoriteNumber = await contract.retrieve();
  console.log(`updated favorite number : ${updatedFavoriteNumber}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
