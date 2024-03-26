const PORT = 8080;
const {
  addUser,
  findUserByEmail,
  addTask,
  updateTask,
  deleteTask,
  filterTasks,
} = require("./databasefunctions");

const config = require("./knexfile");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
const bodyParser = require("body-parser");

//login and session
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// database
const pg = require("pg");
const knex = require("knex");
const db = knex(config);

// middleware start
app.use(cors({ credentials: true, origin: "http://localhost:5173" })); //allows cookies to be transmitted across origins and specifies a domain to be allowed
app.use(bodyParser.json());

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, sameSite: "lax" },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      const user = await findUserByEmail(email);
      if (!user) {
        return done(null, false, { message: "No user exists" });
      }
      const matchedPassword = await bcrypt.compare(
        password,
        user.hashedpassword
      );
      if (!matchedPassword) {
        return done(null, false, { message: "Wrong password" });
      }
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
  const user = await findUserByEmail(email);
  done(null, user);
});

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (await findUserByEmail(email)) {
    return res.status(500).json("User already exists.");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = { username, email, hashedPassword };
  addUser(user);
  res.status(201).json("User registered successfully.");
});

app.get("/v1/todo", (req, res) => {
  if (req.isAuthenticated()) {
    db.select()
      .from("todos")
      .where("user_id", req.user.id)
      .then(function (todo) {
        res.json(todo);
      });
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

app.post("/login", passport.authenticate("local"), (req, res) => {
  res.json("Welcome " + req.user.name);
});

app.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).json("Successfully logged out");
  });
});

app.post("/v1/todo/add", async (req, res) => {
  if (req.isAuthenticated()) {
    const { title, description, dueDate, completed } = req.body;
    //allowing for validation later
    const task = {
      title,
      description,
      due_date: dueDate,
      completed,
    };
    const { status, message } = await addTask(task, req.user.id);
    res.status(status).json(message);
  } else {
    res.status(401).json("Unauthorized");
  }
});

app.put("/v1/todo/update", async (req, res) => {
  if (req.isAuthenticated()) {
    const { id, title, description, dueDate, completed } = req.body;
    //allowing for validation later
    const task = {
      title,
      description,
      due_date: dueDate,
      completed,
    };
    const { status, message } = await updateTask(task, id);
    res.status(status).json(message);
  } else {
    res.status(401).json("Unauthorized");
  }
});

app.delete("/v1/todo/delete", async (req, res) => {
  if (req.isAuthenticated()) {
    const { id } = req.body;
    //allowing for validation later
    const { status, message } = await deleteTask(id);
    res.status(status).json(message);
  } else {
    res.status(401).json("Unauthorized");
  }
});

app.post("/v1/todo/filter", async (req, res) => {
  if (req.isAuthenticated()) {
    const { page, filter } = req.body;
    //allowing for validation later
    const results = await filterTasks(req.user.id, page, filter);
    res.status(200).json(results);
  } else {
    res.status(401).json("Unauthorized");
  }
});

app.listen(PORT, () => {
  console.log("Server listening on port:" + PORT);
});
