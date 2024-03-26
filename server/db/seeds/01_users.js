exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          name: "Some Guy",
          email: "test1@test.com",
          hashedpassword:
            "$2b$10$wYgNdqQ8GGSOvAaXQlxBguCVVtWIsXbUajn42ikJb9oMd4DnbsEt6",
        },
        {
          name: "Some Girl",
          email: "test2@test.com",
          hashedpassword:
            "$2b$10$wYgNdqQ8GGSOvAaXQlxBguCVVtWIsXbUajn42ikJb9oMd4DnbsEt6",
        },
        {
          name: "Someone Else",
          email: "test3@test.com",
          hashedpassword:
            "$2b$10$wYgNdqQ8GGSOvAaXQlxBguCVVtWIsXbUajn42ikJb9oMd4DnbsEt6",
        },
      ]);
    });
};
