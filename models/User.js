const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Bcrypt = require("bcrypt");
const saltRounds = 8;

const newUserSchema = new Schema ({
    username: ({
        type:String,
        required:true
    }),

    password: ({
        type:String,
        required:true
    }),

    confirmPassword: ({
        type:String,
        required:true
    }),
    
    email: ({
        type:String,
        required:true
    }),

    phone: ({
        type:String,
        required:true
    }),

})

newUserSchema.pre("save", function(next){
    this.password = Bcrypt.hashSync(this.password,saltRounds)
    next()
})
module.exports = mongoose.model("User",newUserSchema)