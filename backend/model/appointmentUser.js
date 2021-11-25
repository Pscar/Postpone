module.exports = (sequelize, Sequelize) => {
  const appointments_user = sequelize.define(
    "appointments_user",
    {
      appointments_id: {
        type: Sequelize.INTEGER,
        field: "appointments_id",
        primaryKey: true,
        autoIncrement: true,
      },
      patient_id: {
        type: Sequelize.INTEGER,
        field: "patient_id",
      },
      hn: {
        type: Sequelize.STRING,
        field: "hn",
      },
      doctor_name:{
        type: Sequelize.STRING,
        field: "doctor_name"
      },
      locations: {
        type: Sequelize.STRING,
        field: "locations"
      },
      doc_id: {
        type: Sequelize.INTEGER,
        field: "doc_id"
      },
      dateOld: {
        type: Sequelize.STRING,
        field: "dateOld"
      },
      dateNew: {
        type: Sequelize.STRING,
        field: "dateNew"
      },
      course: {
        type: Sequelize.STRING,
        field: "course"
      },
      status: {
        type: Sequelize.STRING,
        field: "status"
      }
    },
    {
      freezeTableName: true,
      underscored: true,
    }
  );
  return appointments_user;
};