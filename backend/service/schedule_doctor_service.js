//import lib
const { Op } = require("sequelize");
const moment = require("moment");
const database = require("../util/database");
const schedule_doctor = database.schedule_doctor;

exports.create = async (data) => {
  try{
      return await schedule_doctor.create(data);
  } catch(err){
      throw err;
  }
};