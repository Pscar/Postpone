const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const patient = sequelize.define('patient', {
    patient_id: {
      type: DataTypes.INTEGER,
      field: "patient_id",
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      field: "email",
    },
    firstname: {
      type: DataTypes.STRING,
      field: "firstname"
    },
    lastname: {
      type: DataTypes.STRING,
      field: "lastname"
    },
    phone: {
      type: DataTypes.STRING,
      field: "phone"
    },
    password: {
      type: DataTypes.STRING,
      field: "password",
    },
    confirmpassword: {
      type: DataTypes.STRING,
      field: "confirmpassword",
    },
    role: {
      type: DataTypes.STRING,
      field: "role",
    },
  },
    {
      freezeTableName: true,
      hooks: {
        beforeCreate: async (patient) => {
          if (patient.password) {
            const salt = await bcrypt.genSaltSync(2);
            patient.password = bcrypt.hashSync(patient.password, salt);
            patient.confirmpassword = bcrypt.hashSync(patient.confirmpassword, salt);
          }
        },
        beforeUpdate: async (patient) => {
          if (patient.password) {
            const salt = await bcrypt.genSaltSync(2);
            patient.password = bcrypt.hashSync(patient.password, salt);
            patient.confirmpassword = bcrypt.hashSync(patient.confirmpassword, salt);

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
    });
  return patient;
};