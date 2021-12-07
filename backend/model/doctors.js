module.exports = (sequelize, Sequelize) => {
  const doctors = sequelize.define(
    "doctors",
    {
      doctorId: {
        type: Sequelize.INTEGER,
        field: "doctorId",
        primaryKey: true,
        autoIncrement: true,
      },
      doctorName: {
        type: Sequelize.STRING,
        field: "doctorName",
      },
      doctorColor: {
        type: Sequelize.STRING,
        field: "doctorColor"
      },
    },
    {
      freezeTableName: true,
      underscored: true,
    }
  );
  return doctors;
};