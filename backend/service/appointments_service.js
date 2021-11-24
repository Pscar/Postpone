const database = require("../util/database");
const Appointment = database.appointments_user;

exports.create = async (data) => {
  try {
    return await Appointment.create(data);
  } catch (err) {
    throw err;
  }
};
exports.getByID = async (appointments_id) => {
  try {
    return await Appointment.findOne({
      where: {
        appointments_id: appointments_id,
      },
    });
  } catch (err) {
    throw err;
  };
};
exports.getByIdNow = async (appointments_id) => {
  try {
    return await Appointment.findOne({
      key: appointments_id,
      order: [['created_at', 'DESC']]
    });
  } catch (err) {
    throw err;
  };
};

exports.getAll = async () => {
  try {
    return await Appointment.findAll();
  } catch (err) {
    throw err;
  }
};
exports.editByID = async (appointments_id, data) => {
  try {
    await Appointment.update(data, {
      where: {
        appointments_id: appointments_id,
      },
    });
    return data
  } catch (err) {
    throw err;
  }
};

exports.DeleteByID = async (appointments_id) => {
  try {
    return await Appointment.destroy({
      where: {
        appointments_id: appointments_id,
      }
    })
  } catch (err) {
    throw err;
  };
};
