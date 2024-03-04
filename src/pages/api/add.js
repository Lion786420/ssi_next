const { v4: uuidv4 } = require("uuid");
const { Web3 } = require("web3");
const bodyParser = require("body-parser");

const contractABI = require("./build/contracts/SSI.json").abi;

const web3 = new Web3("http://127.0.0.1:7545");
const contractAddress = "0x5E61F7Aa0eF6be08eAF71945d0eA1926203119ad";
const contract = new web3.eth.Contract(contractABI, contractAddress);

export default function handler(req, res) {
  const { name, dob, email, phone, address } = req.body;
  let user_did = uuidv4();
  contract.methods
    .addDocument(user_did, name, dob, email, phone, address)
    .send({
      from: "0x5719E0d645269916A4061f63636efF10f2bbFfB8",
      gas: "6721975",
      gasPrice: "20000000000",
    })
    .then((receipt) => {
      console.log("Transaction receipt:", receipt);
    });
  res.send("Done");
}
