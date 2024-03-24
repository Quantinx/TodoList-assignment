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

async function filterTasks(user_id, page, filter = "all") {
  const perPage = 5;
  const currentDate = new Date();
  let query = db("todos").where("user_id", user_id);

  switch (filter) {
    case "today":
      query = query.whereBetween("due_date", [
        currentDate,
        new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() + 1
        ),
      ]);
      break;
    case "tomorrow":
      const tomorrow = new Date(currentDate);
      tomorrow.setDate(currentDate.getDate() + 1);
      query = query.whereBetween("due_date", [
        tomorrow,
        new Date(
          tomorrow.getFullYear(),
          tomorrow.getMonth(),
          tomorrow.getDate() + 1
        ),
      ]);
      break;
    case "7days":
      const sevenDaysLater = new Date(currentDate);
      sevenDaysLater.setDate(currentDate.getDate() + 7);
      query = query.whereBetween("due_date", [currentDate, sevenDaysLater]);
      break;
    case "all":
      break;
    default:
      break;
  }

  query = query.orderBy("due_date", "asc");

  const offset = (page - 1) * perPage;
  query = query.limit(perPage).offset(offset);

  const items = await query.select("*");

  return items;
}

module.exports = {
  addUser,
  findUserByEmail,
  addTask,
  updateTask,
  deleteTask,
  filterTasks,
};
