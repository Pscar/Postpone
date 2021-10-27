module.exports = (sequelize, Sequelize) => {
  // ชื่อ ตัวแปร ที่ให้เหมือนกับชื่อ table
  const doctors = sequelize.define(
    //ชื่อ ตาราง
    "doctors",
    {
      // แต่ละ column พร้อมประเภทตัวแปร
      Doc_id: {
        type: Sequelize.INTEGER,
        field: "Doc_id",
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        field: "name",
      },
      DocColor: {
        type: Sequelize.STRING,
        field: "DocColor"
      },
    },
    {
      freezeTableName: true,
      underscored: true,
    }
  );
  return doctors;
};