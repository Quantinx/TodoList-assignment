const pw = process.env.HI_G1_EP_PW; //database password
const PORT = 8080;
const {
  addUser,
  findUser,
  findUserByUsername,
  findUserByEmail,
} = require("./fakedatabase");

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
const bodyParser = require("body-parser");

app.use(cors()); // here app is express
app.use(bodyParser.json());

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (await findUserByEmail(email)) {
    console.log("user already exists");
    res.send("User exists");
    return;
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = { username, email, hashedPassword };
  addUser(user);
  res.send("Data received");
});

app.listen(PORT, () => {
  console.log("Server listening on port:" + PORT);
});
