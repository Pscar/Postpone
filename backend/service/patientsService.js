const database = require("../util/database");
const patients = database.patients;

exports.create = async (data) => {
  try {
    return await patients.create(data);
  } catch (err) {
    throw err;
  }
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
