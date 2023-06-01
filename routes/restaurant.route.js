const express = require("express");
const RestaurantModel = require("../model/RestaurantModel");
const restaurantRouter = express.Router();

restaurantRouter.get("/", async (req, res) => {
    try {
        const data = await RestaurantModel.find();
        res.json(data)
    } catch (error) {
        res.json("Something went wrong while getting the restaurants " + error)
    }
});

restaurantRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const data = await RestaurantModel.find({ _id: id });
        res.json(data)
    } catch (error) {
        res.json("Something went wrong while getting the restaurant " + error)
    }
});

restaurantRouter.get("/:id/menu", async (req, res) => {
    const id = req.params.id;
    try {
        const data = await RestaurantModel.findById({ _id: id });
        res.json(data.menu)
    } catch (error) {
        res.json("Something went wrong while getting the restaurant " + error)
    }
});

restaurantRouter.post("/:id/menu", async (req, res) => {
    const id = req.params.id;
    const payload = req.body;
    try {
        const data = await RestaurantModel.findById({ _id: id });
        let menu = data.menu;
        menu.push(payload);
        await RestaurantModel.findByIdAndUpdate({ _id: id }, data)
        res.json("menu added successfully")
    } catch (error) {
        res.json("Something went wrong while getting the restaurant " + error)
    }
});

restaurantRouter.delete("/:id1/menu/:id2", async (req, res) => {
    const id1 = req.params.id1;
    const id2 = req.params.id2;
    try {
        const data = await RestaurantModel.findById({ _id: id1 });
        let menu = data.menu;
        let newMenu = menu.map((el,i)=>{
            if(el._id == id2){
                menu.splice(i,1);
            }
            return el;
        });
        await RestaurantModel.findByIdAndUpdate({ _id: id1 }, data)
        res.json("menu deleted successfully")
        
    } catch (error) {
        res.json("Something went wrong while getting the restaurant " + error)
    }
});



// restaurantRouter.post("/", async (req, res) => {
//     const payload = req.body;
//     try {
//         const rest = new RestaurantModel(payload);
//         await rest.save();
//         res.json("Restaurant added successfully");
//     } catch (error) {
//         res.json("Something went wrong while adding the restaurant "+error)
//     }
// });

module.exports = restaurantRouter;