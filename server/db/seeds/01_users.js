exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          name: "Some Guy",
          email: "test1@test.com",
          hashedpassword:
            "wYgNdqQ8GGSOvAaXQlxBguCVVtWIsXbUajn42ikJb9oMd4DnbsEt6",
        },
        {
          id: 2,
          name: "Some Girl",
          email: "test2@test.com",
          hashedpassword:
            "wYgNdqQ8GGSOvAaXQlxBguCVVtWIsXbUajn42ikJb9oMd4DnbsEt6",
        },
        {
          id: 3,
          name: "Someone Else",
          email: "test3@test.com",
          hashedpassword:
            "wYgNdqQ8GGSOvAaXQlxBguCVVtWIsXbUajn42ikJb9oMd4DnbsEt6",
        },
      ]);
    });
};
