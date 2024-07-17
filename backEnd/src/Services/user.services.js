const {
  signupQuery,
  getUserByUserIdQuery,
  getUserByEmailQuery,
} = require("../Infrastructure/user.queries.js");
const bcrypt = require("bcrypt");

const signUpService = async (email, name, password) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = await signupQuery(email, name, hashedPassword);
    return newUser;
  } catch (error) {
    throw error;
  }
};

const getUserByUserIdService = async (userId) => {
  try {
    const users = await getUserByUserIdQuery(userId);
    return users;
  } catch (error) {
    throw error;
  }
};

const getUserByEmailService = async (email) => {
  try {
    const user = await getUserByEmailQuery(email);
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  signUpService,
  getUserByUserIdService,
  getUserByEmailService,
};
