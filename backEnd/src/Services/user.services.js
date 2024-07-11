import {
  signupQuery,
  getUserByUserIdQuery,
  getUserByEmailQuery,
} from "../Infrastructure/user.queries.js";
import { genSaltSync, hashSync, compareSync } from "bcrypt";

export const signUpService = async (email, name, password) => {
  try {
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(password, salt);

    const newUser = await signupQuery(email, name, hashedPassword);
    return newUser;
  } catch (error) {
    throw error;
  }
};

export const getUserByUserIdService = async (userId) => {
  try {
    const users = await getUserByUserIdQuery(userId);
    return users;
  } catch (error) {
    throw error;
  }
};

export const getUserByEmailService = async (email) => {
  try {
    const user = await getUserByEmailQuery(email);
    return user;
  } catch (error) {
    throw error;
  }
};
