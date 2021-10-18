module.exports = (sequelize, Sequelize) => {
  // ชื่อ ตัวแปร ที่ให้เหมือนกับชื่อ table
  const informations = sequelize.define(
    //ชื่อ ตาราง
    "informations",
    {
      // แต่ละ column พร้อมประเภทตัวแปร
      info_id: {
        type: Sequelize.INTEGER,
        field: "info_id",
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        field: "user_id",
      },
      hn: {
        type: Sequelize.INTEGER,
        field: "hn",
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
      appointments: {
        type: Sequelize.STRING,
        field: "appointments"
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
  return informations;
};