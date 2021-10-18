//import lib
const { Op } = require("sequelize");
const moment = require("moment");
const database = require("../util/database");
const Informations = database.informations;

exports.create = async (data) => {
  try{
      return await Informations.create(data);
  } catch(err){
      throw err;
  }
};