const fakeDatabase = [
  {
    id: 0,
    username: "test",
    email: "me@ow.cat",
    password: "$2b$10$wYgNdqQ8GGSOvAaXQlxBguCVVtWIsXbUajn42ikJb9oMd4DnbsEt6",
  },
];
let index = 1;

function addUser(user) {
  const { username, email, hashedPassword } = user;
  fakeDatabase.push({
    id: index,
    username,
    email,
    password: hashedPassword,
  });
  console.log(JSON.stringify(fakeDatabase));
  index = index + 1;
}

function findUser(user) {
  const foundUser = fakeDatabase.find((entry) => entry.username === user);
  return foundUser;
}

async function findUserByUsername(username) {
  return fakeDatabase.find((user) => user.username === username);
}

async function findUserByEmail(email) {
  return fakeDatabase.find((user) => user.email === email);
}

module.exports = {
  addUser,
  findUser,
  findUserByUsername,
  findUserByEmail,
};
