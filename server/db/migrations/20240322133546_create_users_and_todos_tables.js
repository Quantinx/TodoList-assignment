exports.up = function (knex, Promise) {
  return knex.schema
    .createTable("users", function (table) {
      table.increments("id");
      table.string("name").notNullable();
      table.string("email").notNullable();
      table.string("hashedpassword").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
    })
    .createTable("todos", function (table) {
      table.increments("id");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.string("title").notNullable();
      table.string("description").notNullable();
      table.timestamp("duedate").notNullable().defaultTo(knex.fn.now());
      table.boolean("completed").notNullable().defaultTo(false);
      table.integer("user_id").references("id").inTable("users");
    });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("todos").dropTable("users");
};
