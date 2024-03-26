exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("todos")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("todos").insert([
        {
          title: "go to store for milk",
          description: "a test description",
          user_id: "540e0dad-7837-419e-b142-5ea7dca433fa", // Replace with actual UUID
        },
        {
          title: "walk the dog",
          description: "a test description",
          user_id: "540e0dad-7837-419e-b142-5ea7dca433fa",
        },
        {
          title: "go to the gym",
          description: "a test description",
          user_id: "6ca6de66-92ba-43ca-9678-c7f9cba11778",
        },
        {
          title: "stop the damn leafblowers outside",
          description: "a test description",
          user_id: "6ca6de66-92ba-43ca-9678-c7f9cba11778",
        },
        {
          title: "get the mail",
          description: "a test description",
          user_id: "cf6f946a-1fa2-4ea4-925b-06df502ec5a0",
        },
        {
          title: "get some headphones",
          description: "a test description",
          user_id: "cf6f946a-1fa2-4ea4-925b-06df502ec5a0",
        },
      ]);
    });
};
