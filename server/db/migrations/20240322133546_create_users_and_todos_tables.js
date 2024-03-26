exports.up = function (knex) {
  return knex.schema
    .createTable("users", function (table) {
      table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()")).primary();
      table.string("name").notNullable();
      table.string("email").notNullable();
      table.string("hashedpassword").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
    })
    .createTable("todos", function (table) {
      table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()")).primary();
      table.string("title").notNullable();
      table.string("description").notNullable();
      table.timestamp("due_date").defaultTo(knex.fn.now());
      table.boolean("completed").defaultTo(false);
      table
        .uuid("user_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.timestamp("created_at").defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable("todos").dropTable("users");
};
