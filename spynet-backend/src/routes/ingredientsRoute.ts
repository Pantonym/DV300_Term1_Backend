import express from "express";
import AppDataSource from "../datasource";
import { Ingredients } from "../entities/ingredients";

const ingredientRouter = express.Router()

ingredientRouter.use(express.json())

const appDataSource = AppDataSource;

// get all ingredient items
// add async await if an error is sent back 
ingredientRouter.get("/", async (req, res) => {

    try {
        const items = await appDataSource.getRepository(Ingredients).find();
        res.json(items);
    } catch (error) {
        console.error("Error fetching inventory items", error);
        res.status(500).json({ error: 'Internal service error' });
    }

})

// TODO: Recipe Get All

// get single recipe
ingredientRouter.get("/:id", (req, res) => {

})

// create recipe
ingredientRouter.put("/create", (req, res) => {
    const { name, description, amountCrafted, ingredientsNeeded } = req.body;
})

// Update single recipe item
// TypeORM searches for the Private key, and if it exists, it will change from create to update automatically.
ingredientRouter.put("/update/:id", async (req, res) => {

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

export default ingredientRouter;