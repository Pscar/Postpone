const database = require("../util/database");
const User = database.user;

exports.create = async (data) => {
  try {
    return await User.create(data);
  } catch (err) {
    throw err;
  }
};

exports.getAll = async () => {
  try {
    return await User.findAll();
  } catch (err) {
    throw err;
  }
};

exports.getByID = async (user_id) => {
  try {
    return await User.findOne({
      where: {
        user_id: user_id,
      },
    });
  } catch (err) {
    throw err;
  };
};

exports.getByEmail = async (email) => {
  try {
    return await User.findOne({
      where: {
        email: email,
      },
    });
  } catch (err) {
    throw err;
  };
};

exports.editByEmail = async (email, data) => {
  try {
    await User.update(data, {
      where: {
        email: email,
      },
    });
    return data

  } catch (err) {
    throw err;
  }
};
