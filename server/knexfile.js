const config = {
  client: "postgresql",
  version: "3.2",
  connection: {
    host: process.env.HI_G1_EP_HST,
    port: 5432,
    user: process.env.HI_G1_EP_UN,
    password: process.env.HI_G1_EP_PW,
    database: process.env.HI_G1_EP_DB,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: __dirname + "/db/migrations",
  },
  seeds: {
    directory: __dirname + "/db/seeds",
  },
};

module.exports = config;
