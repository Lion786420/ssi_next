import { demoUser } from "../issuer/index";
const { Web3 } = require("web3");
const bodyParser = require("body-parser");

const contractABI = require("./truffle/build/contracts/SSI.json").abi;

const web3 = new Web3("http://127.0.0.1:7545");
const contractAddress = "0x1C54918d84D6ceeA3f3E0A45Cea914b5fDc8792E";
const contract = new web3.eth.Contract(contractABI, contractAddress);

const TUser = [
  { id: "234234", phone: "9805401044", name: "Aayush Adhikari" },
  { id: "wq3e4534", phone: "9833723845", name: "Aarjan KC" },
  { id: "54393845", phone: "9861444556", name: "Aniket Thapa" },
];

export default function handler(req, res) {
  let name;
  const { id, did } = req.body;
  TUser.forEach((user) => {
    if (user.id === id) {
      name = user.name;
      contract.methods
        .updateName(did, name)
        .send({
          from: "0x252F27d994D4260B511ed0bDCfFab50FaAEDE30A", // Replace 'YOUR_SENDER_ADDRESS' with the address you're sending the transaction from
          gas: 6721975, // Adjust gas limit as needed
        })
        .then((receipt) => {
          console.log("Transaction receipt:", receipt);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  });
  res.send({ fullName: name });
}
