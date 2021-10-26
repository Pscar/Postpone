module.exports = (sequelize, Sequelize) => {
  // ชื่อ ตัวแปร ที่ให้เหมือนกับชื่อ table
  const postpone_user = sequelize.define(
    //ชื่อ ตาราง
    "postpone_user",
    {
      // แต่ละ column พร้อมประเภทตัวแปร
      postpone_id: {
        type: Sequelize.INTEGER,
        field: "postpone_id",
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
      appointments:{
        type: Sequelize.STRING,
        field: "appointments"
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
  return postpone_user;
};