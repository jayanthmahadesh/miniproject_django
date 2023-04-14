import { ethers } from "./ether-5.6.esm.min.js";
import { abi, contractAddress } from "./constants.js";
const connectbutton = document.getElementById("connectButton");
const fundbutton = document.getElementById("fund");
const balanceButton = document.getElementById("getBalance");
const withdrawbutton = document.getElementById("withdraw");
connectbutton.onclick = connect;
fundbutton.onclick = fund;
balanceButton.onclick = getBalance;
withdrawbutton.onclick = withdraw;
async function connect() {
  console.log("jayanth")
  if (typeof window.ethereum !== "undefined") {
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
      console.log(error);
    }
    connectbutton.innerHTML = "Connected";
    const accounts = await ethereum.request({ method: "eth_accounts" });
    console.log(accounts);
  } else {
    connectbutton.innerHTML = "Please install MetaMask";
  }
}

async function getBalance() {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(contractAddress);
    console.log(ethers.utils.formatEther(balance));
  }
}

async function fund() {
  const ethAmount = document.getElementById("ethAmount").value;
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    console.log(signer);
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      const transactionResponse = await contract.fund({
        value: ethers.utils.parseEther(ethAmount),
      });
      await listenforTransactionMine(transactionResponse, provider);

      console.log("done");
    } catch {
      console.log("transaction rejected");
    }
  }
}
function listenforTransactionMine(transactionResponse, provider) {
  console.log(`mining ${transactionResponse.hash} ... `);
  return new Promise((resolve, reject) => {
    provider.once(transactionResponse.hash, (transactionReceipt) => {
      console.log(
        `completed with ${transactionReceipt.confirmations} confirmations`
      );
      resolve();
    });
  });
}
async function withdraw() {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      const transactionResponse = await contract.withdraw();
      await listenforTransactionMine(transactionResponse, provider);
    } catch {
      alert("you are not the owner");
    }
  }
}
