const DoctorService = require('../service/doctor_service');

const get_nowdate = new Date();
let get_date = ("0" + get_nowdate.getDate()).slice(-2);
let get_month = ("0" + (get_nowdate.getMonth() + 1)).slice(-2);
let get_year = get_nowdate.getFullYear();

let get_hour = get_nowdate.getHours();
let get_minute = get_nowdate.getMinutes();
let get_second = get_nowdate.getSeconds();

var date_now = (`${get_date}/${get_month}/${get_year}`);
var time_now = (`${get_hour}:${get_minute}:${get_second}`);

exports.CreateDoctor = async (req, res) => {

  const {
    name,
    DocColor,
  } = req.body;

  try {

    const createNewDoctor = await DoctorService.create({
      name: name,
      DocColor: DocColor
    });

    return res.status(200).send({
      status: "success",
      data: createNewDoctor
    });

  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }

}

exports.GetDoctorByID = async (req, res) => {

  const Doc_id = req.query.Doc_id;

  try {
    const getDoctorID = await DoctorService.getByID(Doc_id);

    return res.status(200).send({
      status: "success",
      data: getDoctorID
    });
  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
}
exports.GetDoctorByName = async (req, res) => {

  const name = req.query.name;

  try {
    const getDoctorByName = await DoctorService.getByID(name);

    return res.status(200).send({
      status: "success",
      data: getDoctorByName
    });
  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
}
exports.GetDoctorAll = async (req, res) => {

  try {
    const getDoctorAccountAll = await DoctorService.getAll();

    return res.status(200).send({
      status: "success",
      data: getDoctorAccountAll
    });
  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
}


exports.EditDoctorID = async (req, res) => {

  const {
    Doc_id,
    name,
    DocColor,
  } = req.body;

  try {
    const editDoctorByID = await DoctorService.editByID(Doc_id, {
      Doc_id: Doc_id,
      name: name,
      DocColor: DocColor
    });

    return res.status(200).send({
      status: "success",
      data: editDoctorByID
    });
  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }

}
exports.DeleteDoctorID = async (req, res) => {

  const Doc_id = req.query.Id;

  try {
    const deleteDoctorByID = await DoctorService.DeleteByID(Doc_id);

    return res.status(200).send({
      status: "success",
      data: deleteDoctorByID
    });
  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }

}