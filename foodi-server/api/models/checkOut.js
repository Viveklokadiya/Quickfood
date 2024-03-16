const mongoose = require('mongoose');
const {Schema} = mongoose;

const checkoutschema = new Schema({
    menuItemId: String,
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 3
    },
    recipe: String,
    image: String, 
    price: Number,
    quantity: Number,
    email:{
        type: String,
        true: true,
        required: true,
    }
})

const checkout = mongoose.model("checkout", checkoutschema);

module.exports = Carts;