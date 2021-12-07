module.exports = (sequelize, Sequelize) => {
  const schedules = sequelize.define(
    "schedules",
    {
      scheduleId: {
        type: Sequelize.INTEGER,
        field: "scheduleId",
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
      startTime: {
        type: Sequelize.STRING,
        field: "startTime"
      },
      endTime: {
        type: Sequelize.STRING,
        field: "endTime"
      },
      doctorId: {
        type: Sequelize.INTEGER,
        field: "doctorId",
      },
      doctorName:{
        type: Sequelize.STRING,
        field: "doctorName",
      }
    },
    {
      freezeTableName: true,
      underscored: true,
    }
  );
  return schedules;
};