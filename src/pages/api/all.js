const { v4: uuidv4 } = require("uuid");
const { Web3 } = require("web3");
const bodyParser = require("body-parser");
const contractABI = require("./build/contracts/SSI.json").abi;

const web3 = new Web3("http://127.0.0.1:7545");
const contractAddress = "0x5E61F7Aa0eF6be08eAF71945d0eA1926203119ad";
const contract = new web3.eth.Contract(contractABI, contractAddress);

async function getAllDocuments() {
  const totalDocuments = await contract.methods.totalDocuments().call();

  const documents = [];
  for (let i = 0; i < totalDocuments; i++) {
    const document = await contract.methods.getDocument(i).call();
    documents.push(document);
  }
  return documents;
}

export default function handler(req, res) {
  const allDocs = [];
  getAllDocuments()
    .then((documents) => {
      documents.forEach((doc) => {
        const each = {
          did: doc.user_did,
          name: doc.name,
          dob: doc.dob,
          email: doc.email,
          phone: doc.phone,
          address: doc.permanentAddress,
        };
        allDocs.push(each);
      });
      console.log(allDocs);
      res.send(allDocs); //Object containing list of all documents issued
    })
    .catch((error) => {
      console.error("Error fetching documents:", error);
    });
}
