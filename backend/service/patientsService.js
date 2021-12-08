const database = require("../util/database");
const patients = database.patients;
const bcrypt = require('bcrypt');

exports.create = async (data) => {
  const saltRounds = 10;

  bcrypt
    .genSalt(saltRounds)
    .then(salt => {
      return bcrypt.hash(data.password, salt);
    })
    .then(hash => {
      const itemCreate = {
        email: data.email,
        password: hash,
        firstName: data.firstName,
        lastName: data.lastName,
        confirmPassword: hash,
        phone: data.phone,
        role: data.role
      }
      return patients.create(itemCreate);
    })
    .catch(err => console.error(err.message));

};

exports.getAll = async () => {
  try {
    return await patients.findAll();
  } catch (err) {
    throw err;
  }
};

exports.getByID = async (patientId) => {
  try {
    return await patients.findOne({
      where: {
        patientId: patientId,
      },
    });
  } catch (err) {
    throw err;
  };
};

exports.getByEmail = async (email) => {
  try {
    return await patients.findOne({
      where: {
        email: email,
      },
    });
  } catch (err) {
    throw err;
  };
};

exports.editByEmail = async (email, data) => {
  try {
    await patients.update(data, {
      where: {
        email: email,
      },
    });
    return data

  } catch (err) {
    throw err;
  }
};
