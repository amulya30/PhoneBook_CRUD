const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

let User = require("../models/user.model");

router.post("/register", async (req, res) => {
  const { name, email, pass } = req.body;

  if (email == "" || name == "" || pass == "") {
    return res.status(400).json({
      msg: "Please Fill Form Correctly",
      errReason: "Empty Field Submitted",
    });
  }

  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ msg: "User Exist !" });
  }

  const password = await bcrypt.hash(pass, 8);

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: password,
  });

  newUser
    .save()
    .then(() => {
      res.status(201).json({ msg: "Registration Successful" });
    })
    .catch((err) => res.status(400).json({ msg: "Error", errReason: err }));
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  // const userId= await User.findOne({email}).then(()=>)
  const { email, pass } = req.body;

  if (!email || !pass) {
    return res.status(400).json({
      msg: "Please Add Email or Password",
      errReason: "Not  a valid request",
    });
  }

  User.findOne({ email })
    .select(["email", "name", "password"])
    .then((fetchedUser) => {
      //Here JWT Token will be created
      console.log(fetchedUser);
      bcrypt
        .compare(pass, fetchedUser.password)
        .then((matched) => {
          if (matched) {
            const user = {
              userName: fetchedUser.name,
              email: fetchedUser.email,
            };

            const token = jwt.sign(fetchedUser._id.toString(), JWT_SECRET_KEY);
            res
              .status(200)
              .json({ msg: "User Found", respData: token, data: user });
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json({ msg: "Invalid Passwd" });
        });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(400)
        .json({ msg: "UserName or Password is incorrect", errReason: err });
    });
});

module.exports = router;
