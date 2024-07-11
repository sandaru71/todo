import genSaltSync from "bcrypt";
import hashSync from "bcrypt";
import { compareSync } from "bcrypt";
import {
  getUserByEmailService,
  getUserByUserIdService,
  signUpService,
} from "../Services/user.services.js";
import pkg from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const { sign } = pkg;

export const signUp = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      return res.status(400).json({
        success: 0,
        message: "Missing required fields",
      });
    }

    const userExists = await getUserByEmailService(email);
    if (userExists) {
      return res.status(400).json({
        success: 0,
        message: "Email already exists",
      });
    }

    const newUser = await signUpService(email, name, password);

    return res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.error("error user cannot e created", error);
    return res.status(500).json({
      success: 0,
      message: "Internal Server Error",
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const body = req.body;

    console.log(req.body);

    if (!body.email || !body.password) {
      return res.status(400).json({
        success: 0,
        message: "Missing required fields",
      });
    }

    const userExists = await getUserByEmailService(body.email);
    if (!userExists) {
      return res.status(401).json({
        success: 0,
        message: "Email or password is incorrect",
      });
    }

    const isPasswordMatch = compareSync(body.password, userExists.password);

    if (isPasswordMatch) {
      userExists.password = undefined;
      const jsontoken = sign(
        { user: userExists },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30m" }
      );

      return res.status(200).json({
        success: 1,
        message: "User logged in successfully",
        token: jsontoken,
        username: userExists.username,
      });
    } else {
      return res.status(401).json({
        success: 0,
        message: "Email or password is incorrect",
      });
    }
  } catch (error) {
    console.error("Signin error: ", error);
    return res.status(500).json({
      success: 0,
      message: "Internal Server Error",
    });
  }
};

// export default { signUp, signIn };
