const database = require("../util/database");
const Patient = database.patient;

exports.create = async (data) => {
  try {
    return await Patient.create(data);
  } catch (err) {
    throw err;
  }
};

exports.getAll = async () => {
  try {
    return await Patient.findAll();
  } catch (err) {
    throw err;
  }
};

exports.getByID = async (user_id) => {
  try {
    return await Patient.findOne({
      where: {
        user_id: user_id,
      },
    });
  } catch (err) {
    throw err;
  };
};

exports.getByEmail = async (email) => {
  try {
    return await Patient.findOne({
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
    await Patient.update(data, {
      where: {
        email: email,
      },
    });
    return data

  } catch (err) {
    throw err;
  }
};
