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
      user_id: {
        type: Sequelize.INTEGER,
        field: "user_id",
      },
      hn: {
        type: Sequelize.STRING,
        field: "hn",
      },
      email: {
        type: Sequelize.STRING,
        field: "email"
      },
      doctor_name:{
        type: Sequelize.STRING,
        field: "doctor_name"
      },
      firstname: {
        type: Sequelize.STRING,
        field: "firstname"
      },
      lastname: {
        type: Sequelize.STRING,
        field: "lastname"
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
      phone: {
        type: Sequelize.STRING,
        field: "phone"
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