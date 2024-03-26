const config = require("./knexfile");
const Joi = require("joi");
const pg = require("pg");
const knex = require("knex");
const db = knex(config);

//allows validation of uuids
const uuidSchema = Joi.string().guid({ version: "uuidv4" });

async function findUserByEmail(email) {
  const user = await db
    .select("id", "name", "email", "hashedpassword")
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
  try {
    await db("todos").insert({
      title: task.title,
      description: task.description,
      due_date: task.due_date,
      completed: task.completed,
      user_id: id,
    });
    return { status: 200, message: "Successfully added task" };
  } catch (error) {
    console.error("Failed to add task:", error);
    return { status: 500, message: "Failed to add task" };
  }
}

async function updateTask(task, id) {
  const { error: idError } = uuidSchema.validate(id);
  if (idError) {
    return { status: 500, message: "Invalid ID" };
  }
  try {
    await db("todos").where("id", id).update(task);
    return { status: 200, message: "Task updated successfully" };
  } catch (error) {
    console.error("Error updating task:", error);
    return { status: 500, message: "Failed to update task" };
  }
}

async function deleteTask(id) {
  const { error: idError } = uuidSchema.validate(id);
  if (idError) {
    return { status: 400, message: "Invalid ID" };
  }

  try {
    await db("todos").where("id", id).delete();
    return { status: 200, message: "Task deleted successfully" };
  } catch (error) {
    console.error("Error deleting task:", error);
    return { status: 500, message: "Failed to delete task" };
  }
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
