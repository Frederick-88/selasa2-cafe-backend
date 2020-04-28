const User = require("../models/User")
const Bcrypt = require("bcrypt");
const JsonWT = require("jsonwebtoken");
const privateKey = "admin";

module.exports = {
    createData: (req,res,next)=>{
        User.create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            phone: req.body.phone,
        })
        .then((result)=>{
            res.json(result)
        })
    },

      getData: function (req,res,next){
    User.find({})
    .then((response) =>{
        res.json({ message:"Successfully Get Data.", data:response})
    })
    .catch(err => {
        console.log(err);
        
    })
},

getDataById: function (req,res,next){

    User.findById(req.params.userId)
    .then((response) =>{
        res.json({ message:"Successfully Get Data by ID.", data:response})
    })
    .catch(err => {
        console.log(err);
        
    })
},

deleteById: function (req,res,next){

    User.findByIdAndRemove(req.params.userId)
    .then((result) =>{
        res.json({ message:"Successfully Remove Data by ID."})
    })
    .catch(err => {
        console.log(err);
        
    })
},

authenticated: function (req, res, next) {
  User.findOne({ username: req.body.username })
    .then((response, err) => {
      if (err) next(err);
      else {
        if (
          response != null &&
          Bcrypt.compareSync(req.body.password, response.password)
        ) {
          jwt.sign(
            {
              id: response._id,
            },
            privateKey,
            { expiresIn: "2 Days" },
            (err, token) => {
              res.json(token);
            }
          );
        } else {
          res.json({ status: err });
        }
      }
    })
    .catch((err) => {
      throw err;
    });
},

};

