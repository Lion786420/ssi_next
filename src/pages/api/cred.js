const { Web3 } = require("web3");
const bodyParser = require("body-parser");
const contractABI = require("./truffle/build/contracts/SSI.json").abi;

const web3 = new Web3("http://127.0.0.1:7545");
const contractAddress = "0x1C54918d84D6ceeA3f3E0A45Cea914b5fDc8792E";
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
  let id = req.body.loginId;
  let nameId;
  console.log();
  if (id == 20) {
    nameId = "Aniket Thapa";
  } else if (id == 21) {
    nameId = "Aayush Adhikari";
  } else if (id == 22) {
    nameId = "Aarjan KC";
  } else if (id == 23) {
    nameId = "Abhijeet Thakur";
  }
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
          fullName: doc.fullName,
        };
        if (each.fullName == nameId) {
          allDocs.push(each);
        }
      });
      res.send(allDocs);
    })
    .catch((error) => {
      console.error("Error fetching documents:", error);
    });
}
