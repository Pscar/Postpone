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
    firstname,
    lastname,
    examination_room,
  } = req.body;

  try {

    const CreateNewDoctor = await DoctorService.create({
      firstname: firstname,
      lastname: lastname,
      examination_room: examination_room,
    });

    return res.status(200).send({
      status: "success",
      data: CreateNewDoctor
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

  const doc_id = req.query.doc_id;

  try {
    const GetDoctorID = await DoctorService.getByID(doc_id);

    return res.status(200).send({
      status: "success",
      data: GetDoctorID
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
    const GetDoctorAccountAll = await DoctorService.getAll();

    return res.status(200).send({
      status: "success",
      data: GetDoctorAccountAll
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
    doc_id,
    firstname,
    lastname,
    examination_room,
  } = req.body;

  try {
    const EditDoctorByID = await DoctorService.editByID(doc_id, {
      doc_id: doc_id,
      firstname: firstname,
      lastname: lastname,
      examination_room: examination_room,
    });

    return res.status(200).send({
      status: "success",
      data: EditDoctorByID
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

  const doc_id = req.query.doc_id;

  try {
    const DeleteDoctorByID = await DoctorService.DeleteByID(doc_id);

    return res.status(200).send({
      status: "success",
      data: DeleteDoctorByID
    });
  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }

}