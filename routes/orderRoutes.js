const express = require("express");
const OrderModel = require("../model/OrderModel");
const orderRouter = express.Router();

orderRouter.post("/", async (req, res) => {
    let payload = req.body;
    let arr = payload.items;
    let totalPrice = 0;
    for (let i = 0; i < arr.length; i++) {
        totalPrice += arr[i].price * arr[i].quantity;
    }
    payload.totalPrice = totalPrice;
    try {
        const order = new OrderModel(payload);
        await order.save();
        res.json("order added successfully");
    } catch (error) {
        res.json("Something went wrong while posting order " + error);
    }
})

module.exports = orderRouter;
