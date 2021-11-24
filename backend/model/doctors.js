module.exports = (sequelize, Sequelize) => {
  const doctors = sequelize.define(
    "doctors",
    {
      doc_id: {
        type: Sequelize.INTEGER,
        field: "doc_id",
        primaryKey: true,
        autoIncrement: true,
      },
      doctor_name: {
        type: Sequelize.STRING,
        field: "doctor_name",
      },
      doc_color: {
        type: Sequelize.STRING,
        field: "doc_color"
      },
    },
    {
      freezeTableName: true,
      underscored: true,
    }
  );
  return doctors;
};