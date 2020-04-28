const MenuSchema = require('../models/Menu')

module.exports = ({
    create: (req,res,next) => {
        MenuSchema.create({
            name: req.body.name,
            detail: req.body.detail,
            price: req.body.price,
            imageURL: req.file && req.file.path
        }).then(result => res.json({message:"Berhasil Create Data", result}))
        .catch(err=>{
            throw(err)
        })
    },

    getAllData : (req,res,next) => {
        MenuSchema.find({})
        .then(result => res.json({message:"Berhasil Get Data", result}))
        .catch(err=>{
            throw(err)
        })
    }
})