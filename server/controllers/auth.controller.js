import UserService from "../services/user.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { handleError } from "../error.js";

export const signup = async (req, res, next) => {
  try {
    let user = req.body;
    if (!user.username || !user.email || !user.password) {
      throw new Error("Username, email and password required");
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    user = await UserService.createUser({ ...user, password: hash });
    const { password, ...data } = user._doc;

    const token = jwt.sign({ id: user._id }, process.env.JWT);

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(data);

    logger.info(`POST /signup - ${JSON.stringify(user)}`);
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  try {
    let user = req.body;
    if (!user.email || !user.password) {
      throw handleError(400, "Email and password required");
    }

    user = await UserService.findUserByEmail(user.email);
    if (!user) {
      throw handleError(404, "User not found");
    }

    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) {
      throw handleError(400, "Wrong password");
    }

    const { password, ...data } = user._doc;

    const token = jwt.sign({ id: user._id }, process.env.JWT);

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(data);

    logger.info(`POST /signup - ${JSON.stringify(user)}`);
  } catch (err) {
    next(err);
  }
};
