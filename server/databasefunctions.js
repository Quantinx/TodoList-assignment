const config = require("./knexfile");

const pg = require("pg");
const knex = require("knex");
const db = knex(config);

async function findUserByEmail(email) {
  const user = await db
    .select("id", "email", "hashedpassword")
    .from("users")
    .where("email", email)
    .first()
    .then(function (user) {
      return user;
    });
  return user;
}

async function addUser(user) {
  db("users")
    .insert({
      name: user.username,
      email: user.email,
      hashedpassword: user.hashedPassword,
    })
    .then(function () {
      console.log("new user successfully registered");
    });
}

async function addTask(task, id) {
  db("todos")
    .insert({
      title: task.title,
      description: task.description,
      due_date: task.dueDate,
      completed: task.completed,
      user_id: id,
    })
    .then(function () {
      console.log("new task added to db");
    });
}

async function updateTask(task, id) {
  console.log(task);
  console.log(id);
  db("todos")
    .where("id", id)
    .update(task)
    .then(function () {
      console.log("task updated successfully");
    });
}

async function deleteTask(id) {
  db("todos")
    .where("id", id)
    .delete()
    .then(function () {
      console.log("task deleted successfully");
    });
}

module.exports = {
  addUser,
  findUserByEmail,
  addTask,
  updateTask,
  deleteTask,
};
