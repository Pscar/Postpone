const Sequelize = require("sequelize");
const configJson = require("./config");

const env = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
const config = configJson[env];

console.log("this is the environment : ", env);
console.log(config);

const sequelize = new Sequelize(
  config.database,
  config.db_user,
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

db.patients = require("../model/patients")(sequelize, Sequelize);
db.appointments = require("../model/appointments")(sequelize, Sequelize);
db.doctors = require("../model/doctors")(sequelize, Sequelize);
db.schedules = require("../model/schedules")(sequelize, Sequelize);

db.patients.hasMany(db.appointments, {
  foreignKey: "patientId",
});

db.appointments.belongsTo(db.patients, {
  foreignKey: "patientId",
});

db.doctors.hasMany(db.appointments, {
  foreignKey: "doctorId",
});

db.appointments.belongsTo(db.doctors, {
  foreignKey: "doctorId",
});

db.doctors.hasMany(db.schedules,{
  foreignKey: "doctorId",
});

db.schedules.belongsTo(db.doctors, {
  foreignKey: "doctorId",
});


module.exports = db;