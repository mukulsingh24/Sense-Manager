const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Register = async (req, res) => {
  // 200 == successfull
  if (await User.findOne({ email: req.body.email })) {
    res.status(200).json({ message: "User Exists" });
  } else {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    await newUser.save();
    res.status(200).json({ message: "New user" });
  }
};

const Login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      const username = user.username || user.email.split('@')[0];
      res
        .status(200)
        .json({ token, userId: user._id, username: username, message: "Login Successful" });
    } else {
      res.status(200).json({ message: "Invalid Credentails" });
    }
  } else {
    res.status(200).json({ message: "User Doesnt Exists" });
  }
};

const GoogleLogin = async (req, res) => {
  const { email, googleId, username } = req.body;
  let user = await User.findOne({ email: email });
  if(user){
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
    const name = user.username || user.email.split('@')[0];
    res.status(200).json({token, userId: user._id, username: name, message: "Login Successful"});
  }
  else{
    const newUser = new User({
      username: username || email.split('@')[0],
      email: email,
      googleId: googleId
    });
    await newUser.save();
    const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
    res.status(200).json({token, userId: newUser._id, username: newUser.username, message: "Registration and Login Successful"});
  }
}

module.exports = { Register, Login };
