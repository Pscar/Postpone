module.exports = (sequelize, DataTypes) => {
  const patients = sequelize.define('patients', {
    patientId: {
      type: DataTypes.INTEGER,
      field: "patientId",
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      field: "email",
    },
    firstName: {
      type: DataTypes.STRING,
      field: "firstName"
    },
    lastName: {
      type: DataTypes.STRING,
      field: "lastName"
    },
    phone: {
      type: DataTypes.STRING,
      field: "phone"
    },
    password: {
      type: DataTypes.STRING,
      field: "password",
    },
    confirmPassword: {
      type: DataTypes.STRING,
      field: "confirmPassword",
    },
    role: {
      type: DataTypes.STRING,
      field: "role",
    },
  },
    {
      freezeTableName: true,
    }
  );
  return patients;
};