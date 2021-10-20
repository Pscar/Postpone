//import lib
const { Op } = require("sequelize");
const moment = require("moment");
const database = require("../util/database");
const Postpone = database.postpone;

exports.create = async (data) => {
  try {
    return await Postpone.create(data);
  } catch (err) {
    throw err;
  }
};
exports.getByID = async (postpone_id) => {
  try {
    return await Postpone.findOne({
      where: {
        postpone_id: postpone_id,
      },
    });
  } catch (err) {
    throw err;
  };
};
exports.getByIdNow = async (postpone_id) => {
  try {
    return await Postpone.findOne({
      key: postpone_id,
      order: [['created_at', 'DESC']]
    });
  } catch (err) {
    throw err;
  };
};


exports.getAll = async () => {
  try {
    return await Postpone.findAll();
  } catch (err) {
    throw err;
  }
};


exports.editByID = async (postpone_id, data) => {
  try {
    return await Postpone.update(data, {
      where: {
        postpone_id: postpone_id,
      },
    });
  } catch (err) {
    throw err;
  }
};

exports.DeleteByID = async (postpone_id) => {
  try {
    return await Postpone.destroy({
      where: {
        postpone_id: postpone_id,
      }
    })
  } catch (err) {
    throw err;
  };
};
