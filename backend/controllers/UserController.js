const UserService = require('../service/user_service');

const get_nowdate = new Date();
let get_date = ("0" + get_nowdate.getDate()).slice(-2);
let get_month = ("0" + (get_nowdate.getMonth() + 1)).slice(-2);
let get_year = get_nowdate.getFullYear();

let get_hour = get_nowdate.getHours();
let get_minute = get_nowdate.getMinutes();
let get_second = get_nowdate.getSeconds();

var date_now = (`${get_date}/${get_month}/${get_year}`);
var time_now = (`${get_hour}:${get_minute}:${get_second}`);

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

  // const user_id = req.query.user_id;

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

exports.EditUserByID = async (req, res) => {

  const {
    user_id,
    email,
    password,
    role

  } = req.body;

  try {
    const editUserByID = await UserService.editByID(user_id, {
      email: email,
      password: password,
      role:'user',
    });

    return res.status(200).send({
      status: "success",
      data: editUserByID
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
  } = req.body;

  try {
    const editUserByEmail = await UserService.editByEmail(email, {
      email: email,
      password: password,
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

exports.DeleteUserByID = async (req, res) => {

  const user_id = req.query.user_id;

  try {
    const deleteUserByID = await UserService.DeleteByID(user_id);

    return res.status(200).send({
      status: "success",
      data: deleteUserByID
    });
  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }

}

exports.DeleteUserByEmail = async (req, res) => {

  const user_email = req.query.email;

  try {
    const deleteUserByEmail = await UserService.DeleteByEmail(user_email);

    return res.status(200).send({
      status: "success",
      data: deleteUserByEmail
    });
  } catch (err) {
    console.log("==== ERROR =====", err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }

}