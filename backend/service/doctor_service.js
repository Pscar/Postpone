const database = require("../util/database");
const Doctor = database.doctor;


exports.getByID = async (doc_id) => {
  try {
    return await Doctor.findOne({
      where: {
        doc_id: doc_id,
      },
    });
  } catch (err) {
    throw err;
  };
};
exports.getByName = async (doctor_name) => {
  try {
    return await Doctor.findOne({
      where: {
        doctor_name: doctor_name,
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
