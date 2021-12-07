const patientsService = require('../service/patientsService');

exports.createPatient = async (req, res) => {

  const {
    email,
    firstName,
    lastName,
    confirmPassword,
    password,
    phone,
  } = req.body;

  try {

    const emailExists = await patientsService.getByEmail(email);

    if (emailExists) {
      return res.status(200).send({
        status: "error",
        data: "มีข้อมูลอยู่แล้ว"
      });

    } else {
      const newpatient = await patientsService.create({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        confirmPassword: confirmPassword,
        phone: phone,
        role: 'patient',
      });

      return res.status(200).send({
        status: "success",
        data: newpatient
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

exports.getPatientByID = async (req, res) => {

  const patientId = req.params.patientId;
  try {
    const patitent = await patientsService.getByID(patientId);

    return res.status(200).send({
      status: "success",
      data: patitent
    });
  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
}

exports.getPatientAll = async (req, res) => {

  try {
    const patients = await patientsService.getAll();

    return res.status(200).send({
      status: "success",
      data: patients
    });
  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
}

exports.getPatientByEmail = async (req, res) => {

  const email = req.query.email;
  try {
    const listPatientEmail = await patientsService.getByEmail(email);

    return res.status(200).send({
      status: "success",
      data: listPatientEmail
    });
  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
}

