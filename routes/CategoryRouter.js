const express = require ('express')
const router = express.Router()
const categoryController = require("../Controller/CategoryController")

router.post('/create', categoryController.create)
router.get('/get', categoryController.getAllCategory)


module.exports = router