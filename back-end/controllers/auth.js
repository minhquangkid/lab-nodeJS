const bcrypt = require('bcryptjs');

const User = require('../models/user');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "minhquangsendemail@gmail.com",
    pass: "ejqneshbbjjonjan",
  },
});


exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        return res.status(400).send({
          message: "Invalid email",
        });
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            // req.session.isLoggedIn = true;
            // req.session.user = user;

           var content = `
            <h1>Bạn đã đăng nhập thành công</h1>`;

            transporter.sendMail(
              {
                to: email,
                from: "minhquangsendemail@gmail.com",
                subject: "Login succeeded!",
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

            return res.status(200).send(true);
          }
          return res.status(400).send({
            message: "Invalid password",
          });
        })
        .catch(err => {
          console.log(err);
          
        });
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {

        return res.status(400).send({
          message: "E-Mail exists already, please pick a different one.",
        });
      }
      return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] }
          });
          return user.save();
        })
        .then(result => {
          res.status(200).send(true);
        });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
