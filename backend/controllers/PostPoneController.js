const PostPoneService = require('../service/postpone_service');
const UserService = require('../service/user_service');
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


exports.CreatePostPone = async (req, res) => {
  console.log("🚀 ~ file: PostPoneController.js ~ line 19 ~ exports.CreatePostPone= ~ req", req)

  const {
    user_id,
    hn,
    Doc_id,
    firstname,
    lastname,
    locations,
    appointments,
    dateOld,
    dateNew,
    course,
    phone,
    status,
    email,
    password,
  } = req.body;

  try {
    const getUserExist = await UserService.getByEmail(email);
    
    if (getUserExist) {
      console.log("User already registered // create Postpone");

      const CreatePostPone = await PostPoneService.create({
        user_id: getUserExist.user_id,
        hn: hn,
        Doc_id: Doc_id,
        firstname: firstname,
        lastname: lastname,
        locations: locations,
        appointments: appointments,
        dateOld: dateOld,
        dateNew: dateNew,
        course: course,
        phone: phone,
        status: status,
        email: getUserExist.email,
      });

      return res.status(200).send({
        status: "success",
        data: [CreatePostPone]
      });

    } else {

      const CreateNewUser = await UserService.create({
        email: email,
        password: password
      });

      const CreateNewPostPone = await PostPoneService.create({
        user_id: CreateNewUser.user_id,
        hn: hn,
        Doc_id: Doc_id,
        firstname: firstname,
        lastname: lastname,
        locations: locations,
        appointments: appointments,
        dateOld: dateOld,
        dateNew: dateNew,
        course: course,
        phone: phone,
        status: status,
        email: CreateNewUser.email,
        password: CreateNewUser.password
      });

      return res.status(200).send({
        status: "success",
        data: [CreateNewPostPone]
      });

    }

  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }

}
exports.GetPostPoneNow = async (req, res) => {

  try {
    const GetPostPoneByNow = await PostPoneService.getByIdNow();

    return res.status(200).send({
      status: "success",
      data: GetPostPoneByNow
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
    Doc_id,
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
      Doc_id: Doc_id,
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