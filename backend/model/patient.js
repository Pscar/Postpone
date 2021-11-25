module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define(
    "patient",
    {
      patient_id: {
        type: Sequelize.INTEGER,
        field: "patient_id",
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: Sequelize.STRING,
        field: "email",
      },
      firstname: {
        type: Sequelize.STRING,
        field: "firstname"
      },
      lastname: {
        type: Sequelize.STRING,
        field: "lastname"
      },
      phone: {
        type: Sequelize.STRING,
        field: "phone"
      },
      password: {
        type: Sequelize.STRING,
        field: "password",
      },
      confirmpassword: {
        type: Sequelize.STRING,
        field: "confirmpassword",
      },
      role: {
        type: Sequelize.STRING,
        field: "role",
      },
    },
    {
      freezeTableName: true,
      underscored: true,
    }
  );
  return user;
};