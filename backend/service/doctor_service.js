//import lib
const { Op } = require("sequelize");
const moment = require("moment");
const database = require("../util/database");
const Doctor = database.doctor;

exports.create = async (data) => {
  try {
    return await Doctor.create(data);
  } catch (err) {
    throw err;
  }
};
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
exports.getAll = async () => {
  try {
    return await Doctor.findAll();
  } catch (err) {
    throw err;
  }
};

exports.editByID = async (Doc_id, data) => {
  try {
    return await Doctor.update(data, {
      where: {
        Doc_id: Doc_id,
      },
    });
  } catch (err) {
    throw err;
  }
};

exports.DeleteByID = async (Doc_id) => {
  try {
    return await Doctor.destroy({
      where: {
        Doc_id: Doc_id,
      }
    })
  } catch (err) {
    throw err;
  };
};
