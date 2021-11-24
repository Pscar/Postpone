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

exports.editByID = async (id, data) => {
  try {
    await Schedule.update(data, {
      where: {
        id: id,
      },
    });
    return data
  } catch (err) {
    throw err;
  }
};

exports.DeleteByID = async (id) => {
  try {
    return await Schedule.destroy({
      where: {
        id: id,
      }
    })
  } catch (err) {
    throw err;
  };
};

