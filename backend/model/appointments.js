module.exports = (sequelize, Sequelize) => {
  const appointments = sequelize.define(
    "appointments",
    {
      appointmentsId: {
        type: Sequelize.INTEGER,
        field: "appointmentsId",
        primaryKey: true,
        autoIncrement: true,
      },
      patientId: {
        type: Sequelize.INTEGER,
        field: "patientId",
      },
      hn: {
        type: Sequelize.STRING,
        field: "hn",
      },
      doctorName:{
        type: Sequelize.STRING,
        field: "doctorName"
      },
      location: {
        type: Sequelize.STRING,
        field: "location"
      },
      doctorId: {
        type: Sequelize.INTEGER,
        field: "doctorId"
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
  return appointments;
};