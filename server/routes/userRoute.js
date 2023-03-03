var express = require("express");
const {
  loginUser,
  getUserDetails,
  registerUser,
  createAppointment,
  getAppointments,
  deleteAppointment,
  singleAppointment,
  updateAppointment,
  logout,
} = require("../controllers/userController");
const { isAuthenticated } = require("../middleware/auth");
var router = express.Router();

/* POST /register */
router.post("/register", registerUser);

/* POST /login */
router.post("/login", loginUser);

/*GET /userdetails */
router.get("/getuser", isAuthenticated, getUserDetails);

/*GET /logout */
router.get("/logout", isAuthenticated, logout);

router.post("/create/appointment", isAuthenticated, createAppointment);

router.get("/get/appointments", isAuthenticated, getAppointments);

router.get("/appointment/:id", isAuthenticated, deleteAppointment);

router.get("/single/:id",isAuthenticated,singleAppointment);

router.post("/update/appointment/:id",isAuthenticated,updateAppointment);
module.exports = router;
