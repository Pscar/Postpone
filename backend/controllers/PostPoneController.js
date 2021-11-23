const PostPoneService = require('../service/postpone_service');
const UserService = require('../service/user_service');
const DoctorService = require('../service/doctor_service');

exports.CreatePostPone = async (req, res) => {
  const {
    hn,
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
    confirmpassword,
  } = req.body;

  try {
    const getUserExist = await UserService.getByEmail(email);
    const getDoctorByName = await DoctorService.getByName(appointments);

    if (getUserExist) {

      const editUserByEmail = await UserService.editByEmail(email, {
        user_id: getUserExist.user_id,
        email: email,
        password: password,
        confirmpassword: confirmpassword,
        role: getUserExist.role,
      });
      
      const createPostPone = await PostPoneService.create({
        user_id: editUserByEmail.user_id,
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
        email: editUserByEmail.email,
        password: editUserByEmail.password,
        confirmpassword: editUserByEmail.confirmpassword,
      });

      return res.status(200).send({
        status: "success",
        data: [createPostPone]
      });

    } else {

      const createNewUser = await UserService.create({
        email: email,
        password: password,
        confirmpassword: confirmpassword,
        role: 'user',
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
        password: createNewUser.password,
        confirmpassword: createNewUser.confirmpassword,
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
    confirmpassword,
    dateOld,
    dateNew,
    course,
    phone,
    status

  } = req.body;

  const getDoctorByName = await DoctorService.getByName(appointments);
  const getUserExist = await UserService.getByEmail(email);
  try {
    // เมื่อ user ต้องการแก้ไข อีเมล พาสเวิร์ด ในกรณีที่เคยสมัครไว้แล้ว
    if (getUserExist) {
      const editUserByEmail = await UserService.editByEmail(email, {
        user_id: getUserExist.user_id,
        email: email,
        password: password,
        confirmpassword: confirmpassword,
        role: getUserExist.role,
      });
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
        email: editUserByEmail.email,
        password: editUserByEmail.password,
        confirmpassword: editUserByEmail.confirmpassword,
        phone: phone,
        Doc_id: getDoctorByName.Doc_id,
        status: status
      });
      return res.status(200).send({
        status: "success",
        data: editPostPoneByID
      });
    } else {
      //เมื่อ user ต้องการแก้ไข อีเมล พาสเวิร์ด แต่ไม่เคยลงทะเบียนไว้เลย
      const createNewUser = await UserService.create({
        email: email,
        password: password,
        confirmpassword: confirmpassword,
        role: 'user',
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
        confirmpassword: createNewUser.confirmpassword,
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