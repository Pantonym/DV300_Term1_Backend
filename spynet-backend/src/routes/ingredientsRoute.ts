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

export default ingredientRouter;