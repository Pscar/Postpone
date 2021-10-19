const PostPoneService = require('../service/postpone_service');

const get_nowdate = new Date();
let get_date = ("0" + get_nowdate.getDate()).slice(-2);
let get_month = ("0" + (get_nowdate.getMonth() + 1)).slice(-2);
let get_year = get_nowdate.getFullYear();

let get_hour = get_nowdate.getHours();
let get_minute = get_nowdate.getMinutes();
let get_second = get_nowdate.getSeconds();

var date_now = (`${get_date}/${get_month}/${get_year}`);
var time_now = (`${get_hour}:${get_minute}:${get_second}`);

exports.CreatePostPone = async (req, res) => {

  const {
    user_id,
    hn,
    doc_id,
    firstname,
    lastname,
    locations,
    appointments,
    dateOld,
    dateNew,
    course,
    phone,
    status
  } = req.body;

  try {
    const CreateNewPostPone = await PostPoneService.create({
      user_id: user_id,
      hn: hn,
      doc_id: doc_id,
      firstname: firstname,
      lastname: lastname,
      locations: locations,
      appointments: appointments,
      dateOld: dateOld,
      dateNew: dateNew,
      course: course,
      phone: phone,
      status: status
    });

    return res.status(200).send({
      status: "success",
      data: CreateNewPostPone
    });

  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }

}
exports.GetPostPoneByID = async (req, res) => {

  const postpone_id = req.query.postpone_id;

  try {
    const GetPostPoneByID = await PostPoneService.getByID(postpone_id);

    return res.status(200).send({
      status: "success",
      data: GetPostPoneByID
    });
  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
}
exports.GetPostPoneAll = async (req, res) => {

  try {
    const GetPostPoneAll = await PostPoneService.getAll();

    return res.status(200).send({
      status: "success",
      data: GetPostPoneAll
    });
  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
}
exports.EditPostPoneByID = async (req, res) => {

  const {
    postpone_id,
    user_id,
    hn,
    firstname,
    lastname,
    locations,
    appointments,
    dateOld,
    dateNew,
    course,
    phone,
    doc_id,
    status

  } = req.body;

  try {
    const EditPostPoneByID = await PostPoneService.editByID(postpone_id, {
      postpone_id: postpone_id,
      user_id: user_id,
      hn: hn,
      firstname: firstname,
      lastname: lastname,
      locations: locations,
      appointments: appointments,
      dateOld: dateOld,
      dateNew: dateNew,
      course: course,
      phone: phone,
      doc_id: doc_id,
      status: status
    });

    return res.status(200).send({
      status: "success",
      data: EditPostPoneByID
    });
  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }

}
exports.DeletePostPoneID = async (req, res) => {

  const postpone_id = req.query.postpone_id;

  try {
    const DeletePostPoneByID = await PostPoneService.DeleteByID(postpone_id);

    return res.status(200).send({
      status: "success",
      data: DeletePostPoneByID
    });
  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }

}