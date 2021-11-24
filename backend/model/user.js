module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define(
    "user",
    {
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