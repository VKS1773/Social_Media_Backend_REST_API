import User from "../Models/User";
import bcrypt from "bcrypt";
export const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (error) {
    return console.log(error);
  }

  if (!users) {
    return res.status(401).json({ message: "no user find" });
  }
  return res.status(200).json({ users });
};

export const createUser = async (req, res) => {
  let check;
  try {
    check = await User.findOne({ email: req.body.email });
  } catch (error) {
    return console.log(error);
  }
  if (check) {
    return res
      .status(400)
      .json({ message: "with this email user already exist" });
  }
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(req.body.password, salt);
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash,
  });

  try {
    await user.save();
  } catch (error) {
    return console.log(error);
  }
  return res.status(201).json({ user });
};

export const loginuser = async (req, res) => {
  let check;
  try {
    check = await User.findOne({ email: req.body.email });
  } catch (error) {
    return console.log(error);
  }
  if (!check) {
    return res
      .status(404)
      .json({ message: "user with this email does not exist" });
  }
  const ispasswordcorrect = bcrypt.compareSync(
    req.body.password,
    check.password
  );
  if (!ispasswordcorrect) {
    return res
      .status(400)
      .json({ message: "please provide correct passowrd for authentication " });
  }
  return res.status(200).json({
    message: "successfully logged in",
  });
};
