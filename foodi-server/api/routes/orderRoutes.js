const express = require("express");
const Orders = require("../models/order");
const router = express.Router();

const orderController = require('../controllers/orderControlers');
const verifyToken = require("../middleware/verifyToken");

// get all menu items 

router.get('/', orderController.getAllOrders );
router.get('/:id',orderController.getorder);
router.patch('/done/:id', orderController.makedone);
router.patch('/cancle/:id', orderController.makecancle);




module.exports= router;