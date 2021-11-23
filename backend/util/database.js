const Sequelize = require("sequelize");
const configJson = require("./config");

const env = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
const config = configJson[env];

console.log("this is the environment : ", env);
console.log(config);

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port_db,
    dialect: config.dialect,
    logging: false,
  }
);

sequelize
  .authenticate()
  .then(async () => {
    await sequelize.sync({ alter: true });
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database: ", err);
  });

const db = {};

db.sequelize = sequelize;

//! Models
db.user = require("../model/user")(sequelize, Sequelize);
db.postpone = require("../model/postpone_users")(sequelize, Sequelize);
db.doctor = require("../model/doctors")(sequelize, Sequelize);
db.schdule_doctor = require("../model/schedule_doctor")(sequelize, Sequelize);

//User relations
db.user.hasMany(db.postpone, {
  foreignKey: "user_id",
  // onDelete: "cascade",
  // constraints : true,
});

db.postpone.belongsTo(db.user, {
  foreignKey: "user_id",
});

db.doctor.hasMany(db.postpone, {
  foreignKey: "Doc_id",
});

db.postpone.belongsTo(db.doctor, {
  foreignKey: "Doc_id",
});

db.doctor.hasMany(db.schdule_doctor,{
  foreignKey: "Doc_id",
});

db.schdule_doctor.belongsTo(db.doctor, {
  foreignKey: "Doc_id",
});


module.exports = db;