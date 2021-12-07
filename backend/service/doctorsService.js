const database = require("../util/database");
const doctors = database.doctors;


exports.getByID = async (doctorId) => {
  try {
    return await doctors.findOne({
      where: {
        doctorId: doctorId,
      },
    });
  } catch (err) {
    throw err;
  };
};
exports.getByName = async (doctorName) => {
  try {
    return await doctors.findOne({
      where: {
        doctorName: doctorName,
      },
    });
  } catch (err) {
    throw err;
  };
};
exports.getAll = async () => {
  try {
    return await doctors.findAll({});
  } catch (err) {
    throw err;
  }
};
