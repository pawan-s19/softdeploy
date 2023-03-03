//creating token and saving it in coookie
const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();
  console.log(token);
  //cookie options
  const options = {
    expires: new Date(Date.now() + 1 * 60 * 24 * 24 * 1000),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    message: "success",
    user,
    token,
  });
};
module.exports = sendToken;
