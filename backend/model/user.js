module.exports = (sequelize, Sequelize) => {
  // ชื่อ ตัวแปร ที่ให้เหมือนกับชื่อ table
  const user = sequelize.define(
    //ชื่อ ตาราง
    "user",
    {
      // แต่ละ column พร้อมประเภทตัวแปร
      user_id: {
        type: Sequelize.INTEGER,
        field: "user_id",
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: Sequelize.STRING,
        field: "email",
      },
      password: {
        type: Sequelize.STRING,
        field: "password",
      },
    },
    {
      freezeTableName: true,
      underscored: true,
    }
  );
  return user;
};