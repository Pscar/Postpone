const bcrypt = require('bcrypt');

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
      hooks: {
        beforeCreate: async (patients) => {
          if (patients.password) {
            const salt = await bcrypt.genSaltSync(2);
            patients.password = bcrypt.hashSync(patients.password, salt);
            patients.confirmPassword = bcrypt.hashSync(patients.confirmPassword, salt);
          }
        },
        beforeUpdate: async (patients) => {
          if (patients.password) {
            const salt = await bcrypt.genSaltSync(2);
            patients.password = bcrypt.hashSync(patients.password, salt);
            patients.confirmPassword = bcrypt.hashSync(patients.confirmPassword, salt);

          }
        }
      },
      instanceMethods: {
        generateHash(password) {
          return bcrypt.hash(password, bcrypt.genSaltSync(8));
        },
        validPassword(password) {
          return bcrypt.compare(password, password);
        }
      }
    }
  );
  return patients;
};