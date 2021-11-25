const PatientService = require('../service/patientService');

exports.CreatePatient = async (req, res) => {

  const {
    email,
    firstname,
    lastname,
    confirmpassword,
    password,
    phone,
  } = req.body;

  try {

    const getPatientAccountByEmail = await PatientService.getByEmail(email);
    
    if (getPatientAccountByEmail) {
      return res.status(200).send({
        status: "error",
        data: "มีข้อมูลอยู่แล้ว"
      });
    } else {
      const createNewPatient = await PatientService.create({
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname,
        confirmpassword: confirmpassword,
        phone: phone,
        role: 'patient',
      });

      return res.status(200).send({
        status: "success",
        data: createNewPatient
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

exports.GetPatientByID = async (req, res) => {

  const patient_id = req.params.patient_id;
  try {
    const getPatientAccountByID = await PatientService.getByID(patient_id);

    return res.status(200).send({
      status: "success",
      data: getPatientAccountByID
    });
  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
}

exports.GetPatientAll = async (req, res) => {

  try {
    const getPatientAccountAll = await PatientService.getAll();

    return res.status(200).send({
      status: "success",
      data: getPatientAccountAll
    });
  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
}

exports.GetPatientByEmail = async (req, res) => {

  const email = req.query.email;
  try {
    const getPatientAccountByEmail = await PatientService.getByEmail(email);

    return res.status(200).send({
      status: "success",
      data: getPatientAccountByEmail
    });
  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
}

exports.EditPatientByEmail = async (req, res) => {

  const {
    email,
    password,
    confirmpassword,
  } = req.body;

  try {
    const editPatientByEmail = await PatientService.editByEmail(email, {
      email: email,
      password: password,
      confirmpassword: confirmpassword,
    });

    return res.status(200).send({
      status: "success",
      data: editPatientByEmail
    });
  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }

}