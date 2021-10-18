module.exports = (sequelize, Sequelize) => {
  // ชื่อ ตัวแปร ที่ให้เหมือนกับชื่อ table
  const schedule_doctor = sequelize.define(
    //ชื่อ ตาราง
    "schedule_doctor",
    {
      // แต่ละ column พร้อมประเภทตัวแปร
      schedule_id: {
        type: Sequelize.INTEGER,
        field: "schedule_id",
        primaryKey: true,
        autoIncrement: true,
      },
      startTime: {
        type: Sequelize.STRING,
        field: "startTime",
      },
      endTime: {
        type: Sequelize.INTEGER,
        field: "endTime",
      },
    },
    {
      freezeTableName: true,
      underscored: true,
    }
  );
  return schedule_doctor;
};