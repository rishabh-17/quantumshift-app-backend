const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const userCheck = await User.findOne({ email: email });
    if (userCheck) {
      res.json({ msg: "email already exist", signup: false });
    } else {
      const hashed = await bcrypt.hash(password, 10);
      const user = new User({
        name: name,
        email: email,
        password: hashed,
      });
      await user.save();
      res.json({ msg: "signup Successful", success: true, user });
    }
  } catch (error) {
    res.json({ msg: "signup failed", success: false });
  }
};

exports.login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email: email });

    console.log(user);
    if (user?.email.length) {
      bcrypt
        .compare(password, user.password)
        .then(() => {
          res.json({
            msg: "login successful",
            login: true,
            user,
            token: getAccessToken(user.id, user.name, user.isPremiumUser),
          });
        })
        .catch((err) => {
          res.json({ msg: "Enter correct password", login: false, err });
        });
    } else {
      res.json({ msg: "user not found", login: false });
    }
  } catch (error) {
    res.json({ msg: "Enter correct password", success: false });
  }
};

function getAccessToken(id, name, isPremiumUser) {
  return jwt.sign(
    { _id: id, name: name, isPremiumUser: isPremiumUser },
    "secretKey"
  );
}

exports.disableUser = async (req, res) => {
  
}
