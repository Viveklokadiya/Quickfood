const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const order = require("../models/order");
require("dotenv").config();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER, // Your Gmail email address
    pass: process.env.PASS, // Your Gmail password
  },
});

router.get("/send/:id", async (req, res) => {
  const idd = req.params.id;
  console.log(idd);
  const query = {
    id: idd,
  };
  try {
    const orderDetails = await order.find(query);
  

    const sendInvoiceEmail = (orderDetails) => {
      let mailOptions = {
        from: "orders@quickfood.com",
        to: `${orderDetails[0].email}`,
        subject: "Order placed Successfully",
        html: `
    <div style="max-width: 600px; margin: auto; padding: 20px; background-color: #fff; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h2 style="text-align: center; color: #333;">Invoice for Your Order</h2>
        <div style="margin-top: 20px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <p style="font-weight: bold; color: #666;">Order ID:</p>
                <p style="color: #333;">${orderDetails[0].id}</p>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <p style="font-weight: bold; color: #666;">Email:</p>
            <p style="color: #333;">${orderDetails[0].email}</p>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <p style="font-weight: bold; color: #666;">Name:</p>
                <p style="color: #333;">${orderDetails[0].name}</p>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <p style="font-weight: bold; color: #666;">Full Address:</p>
                <p style="color: #333;">${orderDetails[0].fulladress}</p>
                </div>
                </div>
                <h3 style="margin-top: 30px; margin-bottom: 20px; color: #333;">Ordered Items</h3>
                <table style="width: 100%; border-collapse: collapse;">
                <thead>
                <tr style="background-color: #f2f2f2;">
                <th style="padding: 10px; text-align: left; color: #333;">Item</th>
                <th style="padding: 10px; text-align: left; color: #333;">Quantity</th>
                <th style="padding: 10px; text-align: left; color: #333;">Amount</th>
                <th style="padding: 10px; text-align: left; color: #333;">Total</th>
                </tr>
                </thead>
            <tbody>
                ${orderDetails[0].lineItems
                  .map(
                    (item) => `
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd; color: #333;">
                        <div style="display: flex; align-items: center;">
                        <div style="width: 40px; height: 40px; border-radius: 50%; overflow: hidden; margin-right: 10px; border: 2px solid orange;">
                        <img src="${item.image[0]}" alt="${
                      item.name
                    }" style="width: 100%; height: auto;">
                        </div>
                        ${item.name}
                        </div>
                        </td>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd; color: #333;">${
                          item.quantity
                        }</td>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd; color: #333;">₹${
                          item.amount / 100
                        }</td>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd; color: #333;">₹${
                          (item.amount * item.quantity) / 100
                        }</td>
                        </tr>
                        `
                  )
                  .join("")}
                        </tbody>
                        </table>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                            <p style="font-weight: bold; color: #666;">Amount:</p>
                            <p style="color: #333;">₹${
                              orderDetails[0].amount
                            }</p>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                            <p style="font-weight: bold; color: #666;">Order Status:</p>
                            <p style="color: #333;">Order is Pending</p>
                        </div>
                        <p style="font-size: 12px; margin-top: 30px; color: #666;">This is an automated email. Please do not reply.</p>
                        </div>
    `,
      };

      // Send email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error occurred while sending email:", error);
          res.status(500).send("Error occurred while sending email");
        } else {
          console.log("Email sent successfully:", info.response);
          res.send("Email sent successfully");
        }
      });
    };
    sendInvoiceEmail(orderDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




router.get("/send/done/:id", async (req, res) => {
  const idd = req.params.id;
  console.log(idd);
  // const query = {
  //   id: idd,
  // };
  try {
    const orderDetails = await order.findById(idd);
    

    const sendInvoiceEmail = (orderDetails) => {
      let mailOptions = {
        from: "orders@quickfood.com",
        to: `${orderDetails.email}`,
        subject: "Your order completed successfully",
        html: `
    <div style="max-width: 600px; margin: auto; padding: 20px; background-color: #fff; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h2 style="text-align: center; color: #333;">Invoice for Your Order</h2>
        <div style="margin-top: 20px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <p style="font-weight: bold; color: #666;">Order ID:</p>
                <p style="color: #333;">${orderDetails.id}</p>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <p style="font-weight: bold; color: #666;">Email:</p>
            <p style="color: #333;">${orderDetails.email}</p>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <p style="font-weight: bold; color: #666;">Name:</p>
                <p style="color: #333;">${orderDetails.name}</p>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <p style="font-weight: bold; color: #666;">Full Address:</p>
                <p style="color: #333;">${orderDetails.fulladress}</p>
                </div>
                </div>
                <h3 style="margin-top: 30px; margin-bottom: 20px; color: #333;">Ordered Items</h3>
                <table style="width: 100%; border-collapse: collapse;">
                <thead>
                <tr style="background-color: #f2f2f2;">
                <th style="padding: 10px; text-align: left; color: #333;">Item</th>
                <th style="padding: 10px; text-align: left; color: #333;">Quantity</th>
                <th style="padding: 10px; text-align: left; color: #333;">Amount</th>
                <th style="padding: 10px; text-align: left; color: #333;">Total</th>
                </tr>
                </thead>
            <tbody>
                ${orderDetails.lineItems
                  .map(
                    (item) => `
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd; color: #333;">
                        <div style="display: flex; align-items: center;">
                        <div style="width: 40px; height: 40px; border-radius: 50%; overflow: hidden; margin-right: 10px; border: 2px solid orange;">
                        <img src="${item.image[0]}" alt="${
                      item.name
                    }" style="width: 100%; height: auto;">
                        </div>
                        ${item.name}
                        </div>
                        </td>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd; color: #333;">${
                          item.quantity
                        }</td>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd; color: #333;">₹${
                          item.amount / 100
                        }</td>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd; color: #333;">₹${
                          (item.amount * item.quantity) / 100
                        }</td>
                        </tr>
                        `
                  )
                  .join("")}
                        </tbody>
                        </table>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                            <p style="font-weight: bold; color: #666;">Amount:</p>
                            <p style="color: #333;">₹${
                              orderDetails.amount
                            }</p>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                            <p style="font-weight: bold; color: #666;">Order Status:</p>
                            <p style="color: #333;">Your Order is Completed</p>
                        </div>
                        <p style="font-size: 12px; margin-top: 30px; color: #666;">This is an automated email. Please do not reply.</p>
                        </div>
    `,
      };

      // Send email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error occurred while sending email:", error);
          res.status(500).send("Error occurred while sending email");
        } else {
          console.log("Email sent successfully:", info.response);
          res.send("Email sent successfully");
        }
      });
    };
    sendInvoiceEmail(orderDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



router.get("/send/cancel/:id", async (req, res) => {
  const idd = req.params.id;
  console.log(idd);
  try {
    const orderDetails = await order.findById(idd);


    const sendInvoiceEmail = (orderDetails) => {
      let mailOptions = {
        from: "orders@quickfood.com",
        to: `${orderDetails.email}`,
        subject: "Your order cancelled",
        html: `
    <div style="max-width: 600px; margin: auto; padding: 20px; background-color: #fff; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h2 style="text-align: center; color: #333;">Invoice for Your Order</h2>
        <div style="margin-top: 20px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <p style="font-weight: bold; color: #666;">Order ID:</p>
                <p style="color: #333;">${orderDetails.id}</p>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <p style="font-weight: bold; color: #666;">Email:</p>
            <p style="color: #333;">${orderDetails.email}</p>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <p style="font-weight: bold; color: #666;">Name:</p>
                <p style="color: #333;">${orderDetails.name}</p>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <p style="font-weight: bold; color: #666;">Full Address:</p>
                <p style="color: #333;">${orderDetails.fulladress}</p>
                </div>
                </div>
                <h3 style="margin-top: 30px; margin-bottom: 20px; color: #333;">Ordered Items</h3>
                <table style="width: 100%; border-collapse: collapse;">
                <thead>
                <tr style="background-color: #f2f2f2;">
                <th style="padding: 10px; text-align: left; color: #333;">Item</th>
                <th style="padding: 10px; text-align: left; color: #333;">Quantity</th>
                <th style="padding: 10px; text-align: left; color: #333;">Amount</th>
                <th style="padding: 10px; text-align: left; color: #333;">Total</th>
                </tr>
                </thead>
            <tbody>
                ${orderDetails.lineItems
                  .map(
                    (item) => `
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd; color: #333;">
                        <div style="display: flex; align-items: center;">
                        <div style="width: 40px; height: 40px; border-radius: 50%; overflow: hidden; margin-right: 10px; border: 2px solid orange;">
                        <img src="${item.image[0]}" alt="${
                      item.name
                    }" style="width: 100%; height: auto;">
                        </div>
                        ${item.name}
                        </div>
                        </td>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd; color: #333;">${
                          item.quantity
                        }</td>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd; color: #333;">₹${
                          item.amount / 100
                        }</td>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd; color: #333;">₹${
                          (item.amount * item.quantity) / 100
                        }</td>
                        </tr>
                        `
                  )
                  .join("")}
                        </tbody>
                        </table>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                            <p style="font-weight: bold; color: #666;">Amount:</p>
                            <p style="color: #333;">₹${
                              orderDetails.amount
                            }</p>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                            <p style="font-weight: bold; color: #666;">Order Status:</p>
                            <p style="color: #333;">Your Order is Cancelled</p>
                        </div>
                        <p style="font-size: 12px; margin-top: 30px; color: #666;">This is an automated email. Please do not reply.</p>
                        </div>
    `,
      };

      // Send email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error occurred while sending email:", error);
          res.status(500).send("Error occurred while sending email");
        } else {
          console.log("Email sent successfully:", info.response);
          res.send("Email sent successfully");
        }
      });
    };
    sendInvoiceEmail(orderDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
