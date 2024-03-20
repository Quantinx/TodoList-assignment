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
//login and session
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

app.use(cors({ credentials: true, origin: "http://localhost:5173" })); //allows cookies to be transmitted across origins and specifies a domain to be allowed
app.use(bodyParser.json());

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (await findUserByEmail(email)) {
    console.log("user already exists");
    return res.status(500).json("User already exists.");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = { username, email, hashedPassword };
  addUser(user);
  res.status(201).json("User registered successfully.");
});

app.listen(PORT, () => {
  console.log("Server listening on port:" + PORT);
});
