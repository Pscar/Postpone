const database = require("../util/database");
const appointments = database.appointments;

exports.create = async (data) => {
  try {
    return await appointments.create(data);
  } catch (err) {
    throw err;
  }
};
exports.getByID = async (appointmentsId) => {
  try {
    return await appointments.findOne({
      where: {
        appointmentsId: appointmentsId,
      },
    });
  } catch (err) {
    throw err;
  };
};
exports.getByIdNow = async (appointmentsId) => {
  try {
    return await appointments.findOne({
      key: appointmentsId,
      order: [['created_at', 'DESC']]
    });
  } catch (err) {
    throw err;
  };
};

exports.getAll = async () => {
  try {
    return await appointments.findAll();
  } catch (err) {
    throw err;
  }
};
exports.editByID = async (appointmentsId, data) => {
  try {
    await appointments.update(data, {
      where: {
        appointmentsId: appointmentsId,
      },
    });
    return data
  } catch (err) {
    throw err;
  }
};

exports.deleteByID = async (appointmentsId) => {
  try {
    return await appointments.destroy({
      where: {
        appointmentsId: appointmentsId,
      }
    })
  } catch (err) {
    throw err;
  };
};
