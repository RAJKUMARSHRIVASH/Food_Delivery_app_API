const mongoose = require("mongoose");
const UserModel = require("./UserModel");
const RestaurantModel = require("./RestaurantModel");

const orderSchema = mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'UserModel' },
    restaurant: { type: mongoose.Types.ObjectId, ref: 'RestaurantModel' },
    items: [{
        name: String,
        price: Number,
        quantity: Number
    }],
    totalPrice: Number,
    deliveryAddress: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String
    },
    status: String // e.g, "placed", "preparing", "on the way", "delivered"
});

const OrderModel = mongoose.model("order", orderSchema);

module.exports = OrderModel;