
const order = require("../models/order");

const getAllOrders = async (req, res) => {
    try {
        const orders = await order.find({}).sort({ createdAt: -1 });
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}






const makedone = async (req, res) => {
    const id = req.params.id;
    const {OrderStatus} = req.body;
    try {
        const updatedorder = await order.findByIdAndUpdate(
            id, 
            {OrderStatus: "Completed"},
            {new: true, runValidators: true}
        );

        if(!updatedorder){
            return res.status(404).json({message: "User not found"})
        }
        res.status(200).json(updatedorder)
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const makecancel = async (req, res) => {
    const id = req.params.id;
    const {OrderStatus} = req.body;
    try {
        const updatedorder = await order.findByIdAndUpdate(
            id, 
            {OrderStatus: "Canceled"},
            {new: true, runValidators: true}
        );

        if(!updatedorder){
            return res.status(404).json({message: "User not found"})
        }
        res.status(200).json(updatedorder)
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getorder = async (req, res) => {
    const id = req.params.id;
    try {
        const orderr = await order.findById(id);
        res.status(200).json(orderr)
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};





module.exports = {
    getAllOrders,
    makedone,
    makecancel,
    getorder
};


// app.patch('/api/orders/:id'