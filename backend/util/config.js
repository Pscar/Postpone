require("dotenv").config();

module.exports = {
  development: {
    database: process.env.database,
    db_user: process.env.db_user,
    password: process.env.password,
    host: process.env.host,
    dialect: process.env.dialect,
    port_db: process.env.port_db,
    port: process.env.port,
  },
  test: {
    environment: process.env.NODE_ENV,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: "mysql",
    port_db: process.env.DB_PORT,
    port: process.env.PORT,
  },
};