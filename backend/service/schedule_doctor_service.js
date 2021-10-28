//import lib
const { Op } = require("sequelize");
const moment = require("moment");
const database = require("../util/database");
const Schedule = database.schdule_doctor;
const Doctor = database.doctor;

exports.create = async (data) => {
  try {
    return await Schedule.create(data);
  } catch (err) {
    throw err;
  }
};

exports.getByID = async (Id) => {
  try {
    return await Schedule.findOne({
      where: {
        Id: Id,
      },
    });
  } catch (err) {
    throw err;
  };
};
exports.getAll = async () => {
  try {
    return await Schedule.findAll({});
  } catch (err) {
    throw err;
  }
};

exports.editByID = async (Id, data) => {
  try {
    return await Schedule.update(data, {
      where: {
        Id: Id,
      },
    });
  } catch (err) {
    throw err;
  }
};

exports.DeleteByID = async (Id) => {
  try {
    return await Schedule.destroy({
      where: {
        Id: Id,
      }
    })
  } catch (err) {
    throw err;
  };
};

