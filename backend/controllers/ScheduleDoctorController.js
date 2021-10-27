const ScheduleDoctorService = require('../service/schedule_doctor_service');

const get_nowdate = new Date();
let get_date = ("0" + get_nowdate.getDate()).slice(-2);
let get_month = ("0" + (get_nowdate.getMonth() + 1)).slice(-2);
let get_year = get_nowdate.getFullYear();

let get_hour = get_nowdate.getHours();
let get_minute = get_nowdate.getMinutes();
let get_second = get_nowdate.getSeconds();

var date_now = (`${get_date}/${get_month}/${get_year}`);
var time_now = (`${get_hour}:${get_minute}:${get_second}`);

exports.CreateScheduleDoctor = async (req, res) => {

  const {
    Description,
    Subject,
    Location,
    StartTime,
    EndTime,
    Doc_id
  } = req.body;

  try {
    const CreateNewScheduleDoctor = await ScheduleDoctorService.create({
      Description: Description,
      Subject: Subject,
      Location: Location,
      StartTime: StartTime,
      EndTime: EndTime,
      Doc_id: Doc_id,
    });

    return res.status(200).send({
      status: "success",
      data: CreateNewScheduleDoctor
    });

  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }

}
exports.GetScheduleDoctorByID = async (req, res) => {

  const Id = req.query.Id;

  try {
    const GetScheduleDoctorByID = await ScheduleDoctorService.getByID(Id);

    return res.status(200).send({
      status: "success",
      data: GetScheduleDoctorByID
    });
  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
}
exports.GetScheduleDoctorAll = async (req, res) => {

  try {
    const GetScheduleAll = await ScheduleDoctorService.getAll();

    return res.status(200).send({
      status: "success",
      data: GetScheduleAll
    });
  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
}
exports.EditScheduleByID = async (req, res) => {

  const {
    Id,
    Description,
    Subject,
    Location,
    StartTime,
    EndTime,
    Doc_id
  } = req.body;

  try {
    const EditScheduleByID = await ScheduleDoctorService.editByID(Id, {
      Id: Id,
      Description: Description,
      Subject: Subject,
      Location: Location,
      StartTime: StartTime,
      EndTime: EndTime,
      Doc_id: Doc_id
    });

    return res.status(200).send({
      status: "success",
      data: EditScheduleByID
    });
  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }

}
exports.DeleteScheduleByID = async (req, res) => {

  const Id = req.query.Id;

  try {
    const DeleteScheduleByID = await ScheduleDoctorService.DeleteByID(Id);

    return res.status(200).send({
      status: "success",
      data: DeleteScheduleByID
    });
  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }

}