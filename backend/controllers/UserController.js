const UserService = require('../service/user_service');

exports.CreateUser = async (req, res) => {

  const {
    email,
    password,
    role,
  } = req.body;

  try {
    const getUserExist = await UserService.getByEmail(email);

    if (getUserExist) {
      console.log("User already registered");

      return res.status(200).send({
        status: "error",
        data: "Not Data"
      });
    } else {
      const createNewUser = await UserService.create({
        email: email,
        password: password,
        role: 'user',
      });

      return res.status(200).send({
        status: "success",
        data: createNewUser
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

exports.GetUserByID = async (req, res) => {

  const user_id = req.query.user_id;

  try {
    const getUserAccountByID = await UserService.getByID(user_id);

    return res.status(200).send({
      status: "success",
      data: getUserAccountByID
    });
  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
}

exports.GetUserAll = async (req, res) => {

  try {
    const getUserAccountAll = await UserService.getAll();

    return res.status(200).send({
      status: "success",
      data: getUserAccountAll
    });
  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
}

exports.GetUserByEmail = async (req, res) => {

  const user_email = req.query.email;

  try {
    const getUserAccountByEmail = await UserService.getByEmail(user_email);

    return res.status(200).send({
      status: "success",
      data: getUserAccountByEmail
    });
  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
}

exports.EditUserByEmail = async (req, res) => {

  const {
    email,
    password,
    confirmpassword,
  } = req.body;

  try {
    const editUserByEmail = await UserService.editByEmail(email, {
      email: email,
      password: password,
      confirmpassword: confirmpassword,
    });

    return res.status(200).send({
      status: "success",
      data: editUserByEmail
    });
  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }

}