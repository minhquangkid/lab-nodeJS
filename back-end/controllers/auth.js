const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "minhquangsendemail@gmail.com",
    pass: "ejqneshbbjjonjan",
  },
});

exports.getLogin = (req, res, next) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(400).send({
          message: "Invalid email",
        });
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            // req.session.isLoggedIn = true;
            // req.session.user = user;

            // var content = `
            // <h1>Bạn đã đăng nhập thành công</h1>`;

            // transporter.sendMail(
            //   {
            //     to: email,
            //     from: "minhquangsendemail@gmail.com",
            //     subject: "Login succeeded!",
            //     html: content,
            //   },
            //   function (err, inf) {
            //     if (err) {
            //       console.log(err);
            //     } else {
            //       console.log("Email sent: " + inf.response);
            //     }
            //   }
            // );
            //

            req.session.user = user;

            console.log(req.session.user);
            //
            return res.status(200).send(true);
          }
          return res.status(400).send({
            message: "Invalid password",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        return res.status(400).send({
          message: "E-Mail exists already, please pick a different one.",
        });
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] },
          });
          return user.save();
        })
        .then((result) => {
          var content = `
          <h1>Bạn đã tạo tài khoản thành công</h1>`;

          transporter.sendMail(
            {
              to: email,
              from: "minhquangsendemail@gmail.com",
              subject: "Sign up succeeded!",
              html: content,
            },
            function (err, inf) {
              if (err) {
                console.log(err);
              } else {
                console.log("Email sent: " + inf.response);
              }
            }
          );

          res.status(200).send(true);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getLogout = (req, res, next) => {
  // res.cookie("userId", "", { maxAge: 0 });

  // res.send(true);
  res.clearCookie("userId"); // phải clear cookie bên front-end nữa
  /*
 document.cookie =
          "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  */
  req.session.destroy((err) => {
    console.log(err);
    res.status(200).send(true);
  });
};
