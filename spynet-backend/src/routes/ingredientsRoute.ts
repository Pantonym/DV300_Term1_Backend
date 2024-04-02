import express from "express";
import AppDataSource from "../datasource";
import { Ingredients } from "../entities/ingredients";

const ingredientRouter = express.Router()

ingredientRouter.use(express.json())

const appDataSource = AppDataSource;

var warehouseNum = 0;

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

// get single ingredient item
ingredientRouter.get("/:id/get", async (req, res) => {

    let id = parseInt(req.params.id);

    try {
        const item = await appDataSource.getRepository(Ingredients).findOneBy({ id: id });
        res.json(item);
    } catch (error) {
        console.error("Error fetching inventory items", error);
        res.status(500).json({ error: 'Internal service error' });
    }

})

// create a new ingredient
ingredientRouter.post("/", async (req, res) => {

    let { ingredientName } = req.body;

    try {
        const newIngredient = appDataSource.getRepository(Ingredients).create({ name: ingredientName });
        await appDataSource.getRepository(Ingredients).save(newIngredient);
        res.status(201).json(newIngredient);
    } catch (error) {
        console.error("Error creating new ingredient", error);
        res.status(500).json({ error: 'Internal service error' });
    }
})

// buy single ingredient item (update its value in the respective warehouse to be +1)
ingredientRouter.put("/:id/buy", async (req, res) => {

    let id = parseInt(req.params.id);
    let { warehouse } = req.body;

    warehouseNum = warehouse;

    try {
        const item = await appDataSource.getRepository(Ingredients).findOneBy({ id: id });

        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        switch (warehouse) {
            case 1:
                item.totalWarehouse1 += 1;
                break;
            case 2:
                item.totalWarehouse2 += 1;
                break;
            case 3:
                item.totalWarehouse3 += 1;
                break;
            default:
                return res.status(400).json({ error: 'Invalid warehouse number' });
        }

        const updatedItem = await appDataSource.getRepository(Ingredients).save(item);
        res.json(updatedItem);
    } catch (error) {
        console.error("Error updating inventory item", error);
        res.status(500).json({ error: 'Internal service error' });
    }

})

export default ingredientRouter;