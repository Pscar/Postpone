const database = require("../util/database");
const Schedule = database.schdule_doctor;

exports.create = async (data) => {
  try {
    return await Schedule.create(data);
  } catch (err) {
    throw err;
  }
};

exports.getAll = async () => {
  try {
    return await Schedule.findAll({});
  } catch (err) {
    throw err;
  }
};

exports.editByID = async (schedule_id, data) => {
  try {
    await Schedule.update(data, {
      where: {
        schedule_id: schedule_id,
      },
    });
    return data
  } catch (err) {
    throw err;
  }
};

exports.DeleteByID = async (schedule_id) => {
  try {
    return await Schedule.destroy({
      where: {
        schedule_id: schedule_id,
      }
    })
  } catch (err) {
    throw err;
  };
};
