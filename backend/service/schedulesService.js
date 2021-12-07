const database = require("../util/database");
const schedules = database.schedules;

exports.create = async (data) => {
  try {
    return await schedules.create(data);
  } catch (err) {
    throw err;
  }
};

exports.getAll = async () => {
  try {
    return await schedules.findAll({});
  } catch (err) {
    throw err;
  }
};

exports.editByID = async (scheduleId, data) => {
  try {
    await schedules.update(data, {
      where: {
        scheduleId: scheduleId,
      },
    });
    return data
  } catch (err) {
    throw err;
  }
};

exports.deleteByID = async (scheduleId) => {
  try {
    return await schedules.destroy({
      where: {
        scheduleId: scheduleId,
      }
    })
  } catch (err) {
    throw err;
  };
};

