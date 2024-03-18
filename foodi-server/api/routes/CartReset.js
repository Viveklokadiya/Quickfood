const express = require('express');
const router = express.Router();
const Carts = require('../models/Carts');

router.delete('/:email',async (req,res) => {


    const emaill = req.params.email;
    try {


      // Delete all documents from the Cart collection
      await Carts.deleteMany({email:emaill});
      res.send("Cart has been cleared");
      console.log('Cart reset successfully');
    } catch (error) {
      console.error('Error resetting cart:', error);
    }
});   


module.exports = router;



