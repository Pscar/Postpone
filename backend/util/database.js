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

db.patient = require("../model/patient")(sequelize, Sequelize);
db.appointments_user = require("../model/appointmentUser")(sequelize, Sequelize);
db.doctor = require("../model/doctors")(sequelize, Sequelize);
db.schdule_doctor = require("../model/scheduleDoctor")(sequelize, Sequelize);

db.patient.hasMany(db.appointments_user, {
  foreignKey: "patient_id",
});

db.appointments_user.belongsTo(db.patient, {
  foreignKey: "patient_id",
});

db.doctor.hasMany(db.appointments_user, {
  foreignKey: "doc_id",
});

db.appointments_user.belongsTo(db.doctor, {
  foreignKey: "doc_id",
});

db.doctor.hasMany(db.schdule_doctor,{
  foreignKey: "doc_id",
});

db.schdule_doctor.belongsTo(db.doctor, {
  foreignKey: "doc_id",
});


module.exports = db;