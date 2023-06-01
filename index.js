const express = require("express");
const { connection } = require("./config/db");
const userRouter = require("./routes/userRoute");
const restaurantRouter = require("./routes/restaurant.route");
const orderRouter = require("./routes/orderRoutes");

const app = express();
require("dotenv").config();

app.use(express.json());

app.get("/",(req,res)=>{
    res.json("Welcome to the Food Delivery App");
})

app.use("/api/user",userRouter);
app.use("/api/restaurants",restaurantRouter);
app.use("/api/orders",orderRouter);

app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log(`Server is running to the port ${process.env.port}`)
    } catch (error) {
        console.log("Something went wrong "+error);
    }
});