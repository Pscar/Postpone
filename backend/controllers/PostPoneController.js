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

  const {
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
    const getDoctorByName = await DoctorService.getByName(appointments);

    if (getUserExist) {

      const createPostPone = await PostPoneService.create({
        user_id: getUserExist.user_id,
        hn: hn,
        Doc_id: getDoctorByName.Doc_id,
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
        data: [createPostPone]
      });

    } else {

      const createNewUser = await UserService.create({
        email: email,
        password: password,
        role:'user',
      });

      const createNewPostPone = await PostPoneService.create({
        user_id: createNewUser.user_id,
        hn: hn,
        Doc_id: getDoctorByName.Doc_id,
        firstname: firstname,
        lastname: lastname,
        locations: locations,
        appointments: appointments,
        dateOld: dateOld,
        dateNew: dateNew,
        course: course,
        phone: phone,
        status: status,
        email: createNewUser.email,
        password: createNewUser.password
      });

      return res.status(200).send({
        status: "success",
        data: [createNewPostPone]
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
    const getPostPoneByNow = await PostPoneService.getByIdNow();

    return res.status(200).send({
      status: "success",
      data: getPostPoneByNow
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
    const getPostPoneByID = await PostPoneService.getByID(postpone_id);

    return res.status(200).send({
      status: "success",
      data: getPostPoneByID
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
    const getPostPoneAll = await PostPoneService.getAll();

    return res.status(200).send({
      status: "success",
      data: getPostPoneAll
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
    email,
    password,
    dateOld,
    dateNew,
    course,
    phone,
    status

  } = req.body;

  const getDoctorByName = await DoctorService.getByName(appointments);
  const getUserExist = await UserService.getByEmail(email);
  try {
    if (getUserExist) {
      // เมื่อ user ต้องการแก้ไข อีเมล พาสเวิร์ด ในกรณีที่เคยสมัครไว้แล้ว
      const editPostPoneByID = await PostPoneService.editByID(postpone_id, {
        postpone_id: postpone_id,
        user_id: getUserExist.user_id,
        hn: hn,
        firstname: firstname,
        lastname: lastname,
        locations: locations,
        appointments: appointments,
        dateOld: dateOld,
        dateNew: dateNew,
        course: course,
        email: getUserExist.email,
        password: getUserExist.password,
        phone: phone,
        Doc_id: getDoctorByName.Doc_id,
        status: status
      });
      return res.status(200).send({
        status: "success",
        data: editPostPoneByID
      });
    } else if (!getUserExist) {
      //เมื่อ user ต้องการแก้ไข อีเมล พาสเวิร์ด แต่ไม่เคยลงทะเบียนไว้เลย
      const createNewUser = await UserService.create({
        email: email,
        password: password,
        role:'user',
      });
      const editPostPoneByID = await PostPoneService.editByID(postpone_id, {
        postpone_id: postpone_id,
        user_id: createNewUser.user_id,
        hn: hn,
        firstname: firstname,
        lastname: lastname,
        locations: locations,
        appointments: appointments,
        dateOld: dateOld,
        dateNew: dateNew,
        course: course,
        email: createNewUser.email,
        password: createNewUser.password,
        phone: phone,
        Doc_id: getDoctorByName.Doc_id,
        status: status
      });
      return res.status(200).send({
        status: "success",
        data: editPostPoneByID
      });
    } else {
      //เมื่อ user ต้องการแก้ไขข้อมูลปกติ
      const editPostPoneByID = await PostPoneService.editByID(postpone_id, {
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
        email: email,
        password: password,
        phone: phone,
        Doc_id: getDoctorByName.Doc_id,
        status: status
      });

      return res.status(200).send({
        status: "success",
        data: editPostPoneByID
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
exports.DeletePostPoneID = async (req, res) => {

  const postpone_id = req.query.postpone_id;

  try {
    const deletePostPoneByID = await PostPoneService.DeleteByID(postpone_id);

    return res.status(200).send({
      status: "success",
      data: deletePostPoneByID
    });
  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }

}