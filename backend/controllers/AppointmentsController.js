const AppointmentService = require('../service/appointmentsService');
const PatientService = require('../service/patientService');
const DoctorService = require('../service/doctorService');

exports.CreateAppointment = async (req, res) => {
  const {
    hn,
    firstname,
    lastname,
    locations,
    doctor_name,
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

    const createAppointment = await AppointmentService.create({
      user_id: createNewUser.user_id,
      hn: hn,
      doc_id: getDoctorByName.doc_id,
      firstname: firstname,
      lastname: lastname,
      locations: locations,
      doctor_name: doctor_name,
      dateOld: dateOld,
      dateNew: dateNew,
      course: course,
      phone: phone,
      status: status,
      email: createNewUser.email,
      password: createNewUser.password,
      confirmpassword: createNewUser.confirmpassword,
    });
    // const getUserExist = await UserService.getByEmail(email);
    // const getDoctorByName = await DoctorService.getByName(doctor_name);

    // if (getUserExist) {

    //   const editUserByEmail = await UserService.editByEmail(email, {
    //     user_id: getUserExist.user_id,
    //     email: email,
    //     password: password,
    //     confirmpassword: confirmpassword,
    //     role: getUserExist.role,
    //   });

    //   const createAppointment = await AppointmentService.create({
    //     user_id: editUserByEmail.user_id,
    //     hn: hn,
    //     doc_id: getDoctorByName.doc_id,
    //     firstname: firstname,
    //     lastname: lastname,
    //     locations: locations,
    //     doctor_name: doctor_name,
    //     dateOld: dateOld,
    //     dateNew: dateNew,
    //     course: course,
    //     phone: phone,
    //     status: status,
    //     email: editUserByEmail.email,
    //     password: editUserByEmail.password,
    //     confirmpassword: editUserByEmail.confirmpassword,
    //   });

    //   return res.status(200).send({
    //     status: "success",
    //     data: createAppointment
    //   });
    // } else {

    //   const createNewUser = await UserService.create({
    //     email: email,
    //     password: password,
    //     confirmpassword: confirmpassword,
    //     role: 'user',
    //   });


    return res.status(200).send({
      status: "success",
      data: createAppointment
    });
    //}
  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }

}
exports.GetAppointmentNow = async (req, res) => {

  try {
    const getAppointmentNow = await AppointmentService.getByIdNow();

    return res.status(200).send({
      status: "success",
      data: getAppointmentNow
    });
  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
}
exports.GetAppointmentByID = async (req, res) => {

  const appointments_id = req.params.appointments_id;

  try {
    const getAppointmentID = await AppointmentService.getByID(appointments_id);

    return res.status(200).send({
      status: "success",
      data: getAppointmentID
    });
  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
}
exports.GetAppointmentAll = async (req, res) => {

  try {
    const getAppointmentAll = await AppointmentService.getAll();

    return res.status(200).send({
      status: "success",
      data: getAppointmentAll
    });
  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
}
exports.EditAppointmentByID = async (req, res) => {

  const {
    appointments_id,
    hn,
    firstname,
    lastname,
    locations,
    doctor_name,
    email,
    password,
    confirmpassword,
    dateOld,
    dateNew,
    course,
    phone,
    status

  } = req.body;

  const getDoctorByName = await DoctorService.getByName(doctor_name);
  // const getUserExist = await UserService.getByEmail(email);

  try {
    // if (getUserExist) {
    //   const editUserByEmail = await UserService.editByEmail(email, {
    //     user_id: getUserExist.user_id,
    //     email: email,
    //     password: password,
    //     confirmpassword: confirmpassword,
    //     role: getUserExist.role,
    //   });
    //   const editAppointmentByID = await AppointmentService.editByID(appointments_id, {
    //     appointments_id: appointments_id,
    //     user_id: getUserExist.user_id,
    //     hn: hn,
    //     firstname: firstname,
    //     lastname: lastname,
    //     locations: locations,
    //     doctor_name: doctor_name,
    //     dateOld: dateOld,
    //     dateNew: dateNew,
    //     course: course,
    //     email: editUserByEmail.email,
    //     password: editUserByEmail.password,
    //     confirmpassword: editUserByEmail.confirmpassword,
    //     phone: phone,
    //     Doc_id: getDoctorByName.Doc_id,
    //     status: status
    //   });
    //   return res.status(200).send({
    //     status: "success",
    //     data: editAppointmentByID
    //   });
    // } else {
    //   const createNewUser = await UserService.create({
    //     email: email,
    //     password: password,
    //     confirmpassword: confirmpassword,
    //     role: 'user',
    //   });
    //   const editAppointmentByID = await AppointmentService.editByID(appointments_id, {
    //     appointments_id: appointments_id,
    //     user_id: createNewUser.user_id,
    //     hn: hn,
    //     firstname: firstname,
    //     lastname: lastname,
    //     locations: locations,
    //     doctor_name: doctor_name,
    //     dateOld: dateOld,
    //     dateNew: dateNew,
    //     course: course,
    //     email: createNewUser.email,
    //     password: createNewUser.password,
    //     confirmpassword: createNewUser.confirmpassword,
    //     phone: phone,
    //     Doc_id: getDoctorByName.Doc_id,
    //     status: status
    //   });
    //   return res.status(200).send({
    //     status: "success",
    //     data: editAppointmentByID
    //   });
    // }
  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }

}
exports.DeleteAppointmenteByID = async (req, res) => {

  const appointments_id = req.params.appointments_id;

  try {
    const deleteAppointmenteByID = await AppointmentService.DeleteByID(appointments_id);

    return res.status(200).send({
      status: "success",
      data: deleteAppointmenteByID
    });
  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }

}