const userModel = require("../models/userModel");
const appointmentModel = require("../models/appointmentModel");
const sendToken = require("../utils/acquireJWTToken");

exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await userModel.create({
      name,
      email,
      password,
    });

    if (!user)
      return res.status(500).json({ message: "unable to create user" });
    sendToken(user, 201, res);
  } catch (err) {
    return res.status(500).json(err);
  }
};
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Missing credentials" });
    }

    const user = await userModel.findOne({ email }).select("+password");

    if (!user)
      return res
        .status(500)
        .json({ message: "user not found ! invalid credentials" });

    const matchingUserPassword = await user.comparePassword(password);

    if (!matchingUserPassword)
      return res
        .status(500)
        .json({ message: "user not found ! invalid credentials" });

    sendToken(user, 200, res);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.getUserDetails = async (req, res, next) => {
  try {
    const user = await userModel.findOne({ _id: req.user.id });

    if (!user) return res.status(500).json({ message: "user not found" });

    res.status(200).json({ message: "success", user });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.logout = async (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({ message: "user logged out" });
};

exports.createAppointment = async (req, res, next) => {
  try {
    let { patientName, email, phoneNumber, address, pincode } = req.body;

    let appointment = await appointmentModel.create({
      name: patientName,
      contact: {
        email,
        phone: phoneNumber,
      },
      address,
      pincode,
      user: req.user._id,
    });

    res.status(200).json(appointment);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAppointments = async (req, res, next) => {
  try {
    let appointments = await appointmentModel.find({ user: req.user._id });
    res.status(201).json(appointments);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    await appointmentModel.findOneAndDelete({ _id: req.params.id });
    res.status(201).json({ message: "deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.singleAppointment = async (req, res) => {
  try {
    let appointment = await appointmentModel.findOne({ _id: req.params.id });
    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    console.log(req.body);
    let { patientName, email, phoneNumber, address, pincode } = req.body;
    await appointmentModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        name: patientName,
        contact: {
          email,
          phone: phoneNumber,
        },
        address,
        pincode,
        user: req.user._id,
      }
    );
    res.status(201).json({ message: "updated successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};
