const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 6001;
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
require('dotenv').config()

// middleware
app.use(cors());
app.use(express.json());

// mongodb configuration using mongoose

mongoose
  .connect(
    process.env.MONGO_URI
  )
  .then(
    console.log("MongoDB Connected Successfully!")
  )
  .catch((error) => console.log("Error connecting to MongoDB", error));

  // jwt authentication
  app.post('/jwt', async(req, res) => {
    const user = req.body;
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1hr'
    })
    res.send({token});
  })


//   import routes here
const menuRoutes = require('./api/routes/menuRoutes');
const orderRoutes = require('./api/routes/orderRoutes');
const cartRoutes = require('./api/routes/cartRoutes');
const userRoutes = require('./api/routes/userRoutes');
const checkoutRoutes = require('./api/routes/checkoutRoutes');
const CartReset  = require('./api/routes/CartReset');
const getorders = require('./api/routes/getorder');
const successrt = require('./api/routes/successRoute');
app.use('/menu', menuRoutes);
app.use('/orders', orderRoutes);
app.use('/carts', cartRoutes);
app.use('/users', userRoutes);
app.use('/checkouts', checkoutRoutes);
app.use('/CartReset', CartReset);
app.use('/getorders', getorders);
app.use("/SuccessfulPayment", successrt)

app.get("/", (req, res) => {
  res.send("Hello Quickfood Client Server!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
