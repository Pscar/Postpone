//import lib
const { Op } = require("sequelize");
const moment = require("moment");
const database = require("../util/database");
const doctors = database.doctors;

exports.create = async (data) => {
  try{
      return await doctors.create(data);
  } catch(err){
      throw err;
  }
};