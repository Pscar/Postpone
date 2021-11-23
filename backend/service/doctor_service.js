const database = require("../util/database");
const Doctor = database.doctor;


exports.getByID = async (Doc_id) => {
  try {
    return await Doctor.findOne({
      where: {
        Doc_id: Doc_id,
      },
    });
  } catch (err) {
    throw err;
  };
};
exports.getByName = async (name) => {
  try {
    return await Doctor.findOne({
      where: {
        name: name,
      },
    });
  } catch (err) {
    throw err;
  };
};
exports.getAll = async () => {
  try {
    return await Doctor.findAll({});
  } catch (err) {
    throw err;
  }
};
