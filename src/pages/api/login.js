export default function handler(req, res) {
  const { username, password, role } = req.body;

  if (role === "Holder") {
    if (username.toLowerCase() === "aniket" && password === "Aniket@123") {
      res.send({
        id: "20",
        token:
          "52wVGtZl72asCg05yLRwy3wp2jlWQjgYskqSwceym813p8kcqIzhU30RPhEpxHBV",
        role: "Holder",
      });
    } else if (
      username.toLowerCase() === "aayush" &&
      password === "Aayush@123"
    ) {
      res.send({
        id: "21",
        token:
          "OIG1RLM5uwFfrbGGmyTesskDZeCX2H1SybqILlSyCERTGwzrtHCGpB8aSlCaikxC",
        role: "Holder",
      });
    } else if (
      username.toLowerCase() === "aarjan" &&
      password === "Aarjan@123"
    ) {
      res.send({
        id: "22",
        token:
          "TYqRsTaQorgUlCwmYWbKX6gEAtMatZWXWyYdcdDcmmCG4W1q9TS2E0fQqt1D3t62",
        role: "Holder",
      });
    } else if (
      username.toLowerCase() === "abhijeet" &&
      password === "Abhijeet@123"
    ) {
      res.send({
        id: "23",
        token:
          "ckDE0CrFJlr1I96XCWWrsK7S46k5grex7el7l4zXXKkJcfkYtRQz5b3yCE6sUDOj",
        role: "Holder",
      });
    } else {
      res.send({ id: false, token: false, role: false });
    }
  }

  if (role === "Issuer") {
    if (username === "admin" && password === "Admin@123") {
      res.send({
        id: "1",
        token:
          "hEcQ7vX6cavBimFB9FayIkbgC5DyuJxzHroxZSCTYq03rHtlSBGHB1wY0ldayRg7",
        role: "Issuer",
      });
    } else {
      res.send({ id: false, token: false, role: false });
    }
  }

  if (role === "Verifier") {
    if (username === "verifier" && password === "Verifier@123") {
      res.send({
        id: "3",
        token:
          "Mb40v3c30OXFrurHsX3fOFiSK0DKVHDUCthFQZAcx2CydfbFO3b82L9h4IihDJ8t",
        role: "Verifier",
      });
    } else {
      res.send({ id: false, token: false, role: false });
    }
  }
  res.send({ id: false, token: false, role: false });
}
