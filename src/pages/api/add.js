const { v4: uuidv4 } = require("uuid");
const { Web3 } = require("web3");
const bodyParser = require("body-parser");

const contractABI = require("./truffle/build/contracts/SSI.json").abi;

const web3 = new Web3("http://127.0.0.1:7545");
const contractAddress = "0x1C54918d84D6ceeA3f3E0A45Cea914b5fDc8792E";
const contract = new web3.eth.Contract(contractABI, contractAddress);

export default function handler(req, res) {
  const { name, dob, email, phone, address } = req.body;
  let user_did = uuidv4();
  contract.methods
    .addDocument(user_did, name, dob, email, phone, address)
    .send({
      from: "0x252F27d994D4260B511ed0bDCfFab50FaAEDE30A",
      gas: "6721975",
      gasPrice: "20000000000",
    })
    .then((receipt) => {
      console.log("Transaction receipt:", receipt);
    });
  res.send("Done");
}
