import { demoUser } from "../issuer/index";
const TUser = [
  { id: "234234", phone: "9805401044", name: "Aayush Adhikari" },
  { id: "wq3e4534", phone: "9833723845", name: "Aarjan KC" },
  { id: "54393845", phone: "9861444556", name: "Aniket Thapa" },
];

export default function handler(req, res) {
  let name;
  const { id, did } = req.body;
  TUser.forEach((user) => {
    if ((user.id = id)) {
      name = user.name;
    }
  });
  res.send({ id: id, userFullName: name });
}
