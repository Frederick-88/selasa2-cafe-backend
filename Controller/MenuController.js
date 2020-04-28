const MenuSchema = require('../models/Menu')
const CategorySchema = require("../models/Category")

module.exports = ({
    create: (req,res,next) => {
        MenuSchema.create({
            name: req.body.name,
            detail: req.body.detail,
            price: req.body.price,
            category: req.body.category,
            imageURL: req.file && req.file.path

        }).then(result => res.json({message:"Berhasil Create Data", result}))
        .catch(err=>{
            throw(err)
        })
    },

    getAllData : (req,res,next) => {
        MenuSchema.find({}).populate('category')
        .then(result => res.json({message:"Berhasil Get Data", result}))
        .catch(err=>{
            throw(err)
        })
    },

    deleteMenu: function (req,res,next){

        MenuSchema.findByIdAndRemove(req.params.menuId)
        .then((result) =>{
            res.json({ message:"Successfully Remove Data by ID."})
        })
        .catch(err => {
            throw(err);
            
        })
    },
})