exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex("todos")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("todos").insert([
        {
          id: 1,
          title: "go to store for milk",
          description: "a test description",
          user_id: 1,
        },
        {
          id: 2,
          title: "walk the dog",
          description: "a test description",
          user_id: 2,
        },
        {
          id: 3,
          title: "go to the gym",
          description: "a test description",
          user_id: 3,
        },
        {
          id: 4,
          title: "stop the damn leafblowers outside",
          description: "a test description",
          user_id: 3,
        },
        {
          id: 5,
          title: "get the mail",
          description: "a test description",
          user_id: 3,
        },
        {
          id: 6,
          title: "get some headphones",
          description: "a test description",
          user_id: 3,
        },
      ]);
    });
};
