module.exports = (sequelize, Sequelize) => {
  // ชื่อ ตัวแปร ที่ให้เหมือนกับชื่อ table
  const doctors = sequelize.define(
    //ชื่อ ตาราง
    "doctors",
    {
      // แต่ละ column พร้อมประเภทตัวแปร
      doc_id: {
        type: Sequelize.INTEGER,
        field: "doc_id",
        primaryKey: true,
        autoIncrement: true,
      },
      examination_room: {
        type: Sequelize.STRING,
        field: "examination_room",
      },
      firstname: {
        type: Sequelize.STRING,
        field: "firstname"
      },
      lastname: {
        type: Sequelize.STRING,
        field: "lastname"
      },
    },
    {
      freezeTableName: true,
      underscored: true,
    }
  );
  return doctors;
};