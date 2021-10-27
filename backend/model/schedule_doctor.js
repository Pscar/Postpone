module.exports = (sequelize, Sequelize) => {
  // ชื่อ ตัวแปร ที่ให้เหมือนกับชื่อ table
  const schedule_doctor = sequelize.define(
    //ชื่อ ตาราง
    "schedule_doctor",
    {
      // แต่ละ column พร้อมประเภทตัวแปร
      Id: {
        type: Sequelize.INTEGER,
        field: "Id",
        primaryKey: true,
        autoIncrement: true,
      },
      Description: {
        type: Sequelize.STRING,
        field: "Description",
      },
      Subject: {
        type: Sequelize.STRING,
        field: "Subject"
      },
      Location: {
        type: Sequelize.STRING,
        field: "Location"
      },
      StartTime: {
        type: Sequelize.STRING,
        field: "StartTime"
      },
      EndTime: {
        type: Sequelize.STRING,
        field: "EndTime"
      },
      Doc_id: {
        type: Sequelize.INTEGER,
        field: "Doc_id",
      }
    },
    {
      freezeTableName: true,
      underscored: true,
    }
  );
  return schedule_doctor;
};