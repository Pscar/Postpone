module.exports = (sequelize, Sequelize) => {
  const schedule_doctor = sequelize.define(
    "schedule_doctor",
    {
      id: {
        type: Sequelize.INTEGER,
        field: "id",
        primaryKey: true,
        autoIncrement: true,
      },
      description: {
        type: Sequelize.STRING,
        field: "description",
      },
      subject: {
        type: Sequelize.STRING,
        field: "subject"
      },
      location: {
        type: Sequelize.STRING,
        field: "location"
      },
      starttime: {
        type: Sequelize.STRING,
        field: "starttime"
      },
      endtime: {
        type: Sequelize.STRING,
        field: "endtime"
      },
      doc_id: {
        type: Sequelize.INTEGER,
        field: "doc_id",
      },
      doctor_name:{
        type: Sequelize.STRING,
        field: "doctor_name",
      }
    },
    {
      freezeTableName: true,
      underscored: true,
    }
  );
  return schedule_doctor;
};