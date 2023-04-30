import { ethers } from "./ether-5.6.esm.min.js";
import { abi, contractAddress } from "./constants.js";
const connectbutton = document.getElementById("connectButton");
const fundbutton = document.getElementById("fund");
const balanceButton = document.getElementById("getBalance");
const withdrawbutton = document.getElementById("withdraw");
const transactionbutton = document.getElementById("transaction");
connectbutton.onclick = connect;
fundbutton.onclick = fund;
balanceButton.onclick = getBalance;
withdrawbutton.onclick = withdraw;
transactionbutton.onclick = transaction;
// getownerbutton.onclick = getowner;
async function connect() {
  // console.log("jayanth")
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
  var address;
  const ethAmount = document.getElementById("ethAmount").value;
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    console.log(`this is signer ${signer}`);
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      const transactionResponse = await contract.fund({
        value: ethers.utils.parseEther(ethAmount),
      });
      await listenforTransactionMine(transactionResponse, provider);
      console.log("done");

      //data sending to backend
      const prov = window.ethereum;
      prov.request({ method: 'eth_requestAccounts' })
      .then((accounts) => {
        // Get the user's address
      address = accounts[0];
      })
      .catch((error) => {
        console.error(error);
      });
      const transactionResponsedata = await contract.getowner();
      console.log(`owner is ${transactionResponsedata}`);
      console.log(`current signed account is ${address}`)

      //form to the backend

      const data = {fromaddress: address,toaddress:transactionResponsedata,amount:ethAmount};
      const csrf_token = getCookie('csrftoken'); // getCookie() is a custom function that retrieves the value of the 'csrftoken' cookie
      fetch('/my-view-url/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrf_token , // Include the CSRF token for security
      },
      body: JSON.stringify(data),
      })
      .then(response => response.json());
      // .then(data => console.log(data));
      // .catch(error => console.error(error));
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
async function transaction(){
  var address;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  console.log(`this is signer ${signer}`);
  const contract = new ethers.Contract(contractAddress, abi, signer);
    //data sending to backend
    const prov = window.ethereum;
    prov.request({ method: 'eth_requestAccounts' })
    .then((accounts) => {
      // Get the user's address
    address = accounts[0];
    })
    .catch((error) => {
      console.error(error);
    });
    const transactionResponsedata = await contract.getowner();
    console.log(`owner is ${transactionResponsedata}`);
    console.log(`current signed account is ${address}`)
// console.log(`the first sentence ${address}`)
// sendting from address to backend
var form = document.createElement('form');
form.method = 'POST';
form.action = "transaction"; // Replace "my_view" with the name of your Django view

// Create an input element
var input = document.createElement('input');
input.type = 'hidden';
input.name = 'my_input'; // Replace "my_input" with the name of the key that you will use to access the data in the Django view
input.value = address; // Replace "some data" with the actual data that you want to send

// Add the input element to the form
form.appendChild(input);

// Add the form to the document and submit it
document.body.appendChild(form);
form.submit();
  }

async function getowner(){
  var address;
  var signer;
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const prov = window.ethereum;
    prov.request({ method: 'eth_requestAccounts' })
    .then((accounts) => {
      // Get the user's address
    address = accounts[0];
      console.log(`Metamask account address: ${address}`);
    })
    .catch((error) => {
      console.error(error);
    });
    
    signer = provider.getSigner(); //signer is the user who has currently signed in 
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const transactionResponse = await contract.getowner();
    // console.log(signer)
  
    console.log(`owner is ${transactionResponse}`);
    console.log("inside getowner")
   
  }
  else console.log("else part")

  // posting data to the backend

  const data = {my_data: address};
  console.log(`data adsf is ${data['my_data']}`);
  const csrf_token = getCookie('csrftoken'); // getCookie() is a custom function that retrieves the value of the 'csrftoken' cookie
fetch('/my-view-url/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRFToken': csrf_token , // Include the CSRF token for security

  },
  body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

}


function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

