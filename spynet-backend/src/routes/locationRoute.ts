import express from "express";
import AppDataSource from "../datasource";
import { Location } from "../entities/location";

const LocationRouter = express.Router()

LocationRouter.use(express.json())

const appDataSource = AppDataSource;

// add async await if an error is sent back 
LocationRouter.get("/", async (req, res) => {

    try {
        const items = await appDataSource.getRepository(Location).find();
        res.json(items);
    } catch (error) {
        console.error("Error fetching Location data", error);
        res.status(500).json({ error: 'Internal service error' });
    }

})

// get all Location info
LocationRouter.get("/", async (req, res) => {
    try {
        const Locations = await appDataSource.getRepository(Location).find();
        res.json(Locations);
    } catch (error) {
        console.error("Error fetching all Locations", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// get single Location
LocationRouter.get("/:id", (req, res) => {

})

// create new Location
LocationRouter.put("/create", (req, res) => {
    const { name, address } = req.body;
})

// Update single Location's info
// TypeORM searches for the Private key, and if it exists, it will change from create to update automatically.
LocationRouter.put("/update/:id", async (req, res) => {

    // try {

    //     const id = parseInt(req.params.id); //id of the item we want to update
    //     const { name, category, icon, description, amount } = req.body; // all the values that we want to update

    //     const recipeRouter = await appDataSource.getRepository(Recipe)
    //         .findOneBy({ id: id });

    //     // if inventoryItem is null
    //     if (!recipeRouter) {
    //         res.status(404).json({ message: "No item found" });
    //     } else {
    //         // update all the variables of inventoryItem that you want to update
    //         recipeRouter!.amount = amount;

    //         // save the changes

    //         const updatedItem = await appDataSource.getRepository(Recipe).save(recipeRouter!);
    //         res.json(updatedItem);
    //     }

    //     // NB Send only one response. Multiple res.json statements causes the server to crash.

    // } catch (error) {
    //     console.error("Error updating inventory item.", error);
    //     res.status(500).json({ error: "Internal Service Error" });
    // }

})

export default LocationRouter;