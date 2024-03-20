const pw = process.env.HI_G1_EP_PW; //database password
const PORT = 8080;
const express = require("express");
const cors = require("cors");
const app = express();
const { addUser, findUser, findUserByUsername } = require("./fakedatabase");
const bodyParser = require("body-parser");
//login and session
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
//hashing and encryption
const bcrypt = require("bcrypt");
//middleware
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(bodyParser.json());

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, sameSite: "none" }, //never do this in prod, however localhost has no https
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(async (username, password, done) => {
    //
    const user = await findUserByUsername(username);
    if (!user) {
      return done(null, false, { message: "No user exists" });
    }
    const matchedPassword = await bcrypt.compare(password, user.password);
    if (!matchedPassword) {
      return done(null, false, { message: "Wrong password" });
    }
    return done(null, user);
  })
);

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
  const user = await findUserByUsername(username);
  done(null, user);
});

app.post("/register", async (req, res) => {
  //
  console.log(req.body);

  const { username, password } = req.body;
  if (findUser(username)) {
    console.log("user already exist");
    return res.status(500).json("User already exists.");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = { username, password: hash };
  addUser(user);

  res.status(201).json("User registered successfully.");
});

app.post("/login", passport.authenticate("local"), (req, res) => {
  console.log("Successful login for: " + req.user.username);
  res.json("Welcome " + req.user.username);
});

app.get("/profile", (req, res) => {
  if (req.isAuthenticated()) {
    console.log(req.user);
    res.json(req.user);
  } else {
    res.status(401).json("Unauthorized");
  }
});

app.get("/session", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json("Authorized ");
  } else {
    res.status(401).json("Unauthorized");
  }
});

app.get("/logout", (req, res) => {
  req.logout(); //need to finish this , currently breaks when called
  res.json("Logged out successfully.");
});

app.listen(PORT, () => {
  console.log("Server running on port:" + PORT);
});
