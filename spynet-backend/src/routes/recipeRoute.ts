import express from "express";
import AppDataSource from "../datasource";
import { Recipe } from "../entities/recipe";
import { Ingredients } from "../entities/ingredients";

const recipeRouter = express.Router()

recipeRouter.use(express.json())

const appDataSource = AppDataSource;

var warehouseNum = 0;

// get all recipes items
// add async await if an error is sent back 
recipeRouter.get("/", async (req, res) => {

    try {
        const items = await appDataSource.getRepository(Recipe).find();
        res.json(items);
    } catch (error) {
        console.error("Error fetching inventory items", error);
        res.status(500).json({ error: 'Internal service error' });
    }

})

// get single recipe item
recipeRouter.get("/:id/get", async (req, res) => {

    let id = parseInt(req.params.id);

    try {
        const item = await appDataSource.getRepository(Recipe).findOneBy({ id: id });
        res.json(item);
    } catch (error) {
        console.error("Error fetching inventory items", error);
        res.status(500).json({ error: 'Internal service error' });
    }

})

// get single recipe item's ingredients
recipeRouter.get("/:id/getIngredients", async (req, res) => {

    let id = parseInt(req.params.id);

    try {
        const item = await appDataSource.getRepository(Recipe).findOneBy({ id: id });
        res.json(item?.ingredientsNeeded);
    } catch (error) {
        console.error("Error fetching inventory items", error);
        res.status(500).json({ error: 'Internal service error' });
    }

})

// Update recipe and inventory info when crafted
recipeRouter.put("/:id/craft", async (req, res) => {
    try {

        let id = parseInt(req.params.id);
        let { amount, ingredients, warehouse } = req.body;

        var recipeRequest = await appDataSource.getRepository(Recipe).findOneBy({ id: id });

        if (!recipeRequest) {
            return res.status(500).json({ message: "no recipe found" });
        } else {

            // change which warehouse is affected based on the values sent through the req.body
            if (warehouse === 1) {
                // update the amount that has been crafted
                recipeRequest!.totalWarehouse1 = recipeRequest!.totalWarehouse1 + amount; // updates (already incremented in frontend)

            } else if (warehouse === 2) {
                // update the amount that has been crafted
                recipeRequest!.totalWarehouse2 = recipeRequest!.totalWarehouse2 + amount;

            } else if (warehouse === 3) {
                // update the amount that has been crafted
                recipeRequest!.totalWarehouse3 = recipeRequest!.totalWarehouse3 + amount;

            }

            recipeRequest!.totalAmount = recipeRequest!.totalWarehouse1 + recipeRequest!.totalWarehouse2 + recipeRequest!.totalWarehouse3;

            // Loop through the ingredients and deduct the inventory amount
            var canCraft = await updateInventoryAmount(ingredients, warehouse);

            if (canCraft) {
                // Save our recipe amount and return it
                var newRecipeData = await appDataSource.getRepository(Recipe).save(recipeRequest);
                return res.json(newRecipeData);

            } else {
                return res.status(500).json({ error: "uncraftable" });
            }

        }

    } catch (error) {
        return res.status(500).json({ message: error });
    }
})

const updateInventoryAmount = async (ingredients: any[], warehouse: number) => {

    try {
        var ingredientItems: Ingredients[] = [];

        for (var ingredient of ingredients) {
            var ingredientItem = await appDataSource.getRepository(Ingredients).findOneBy({ id: ingredient.data.id });

            if (!ingredientItem) {
                throw new Error(`Inventory item with ID ${ingredient.data.id} not found`);
            } else {

                if (warehouse === 1) {
                    // update the ingredient amount
                    if (ingredientItem.totalWarehouse1 <= 0) {
                        return false;

                    } else {
                        ingredientItems.push(ingredientItem);
                    }

                } else if (warehouse === 2) {
                    // update the ingredient amount
                    if (ingredientItem!.totalWarehouse2 <= 0) {
                        return false;

                    } else {
                        ingredientItems.push(ingredientItem)
                    }

                } else if (warehouse === 3) {
                    // update the ingredient amount
                    if (ingredientItem!.totalWarehouse3 <= 0) {
                        return false;

                    } else {
                        ingredientItems.push(ingredientItem);
                    }

                }
            }

        }

        for (var ingredientExample of ingredientItems) {

            // change which warehouse is affected based on the values sent through the req.body
            if (warehouse === 1) {
                // update the ingredient amount
                // Each item can only be used once, so there is no need for an amount needed table
                ingredientExample!.totalWarehouse1 = ingredientExample!.totalWarehouse1 - 1;

            } else if (warehouse === 2) {
                // Each item can only be used once, so there is no need for an amount needed table
                ingredientExample!.totalWarehouse2 = ingredientExample!.totalWarehouse2 - 1;

            } else if (warehouse === 3) {
                // Each item can only be used once, so there is no need for an amount needed table
                ingredientExample!.totalWarehouse3 = ingredientExample!.totalWarehouse3 - 1;

            }

            ingredientExample!.totalAmount = ingredientExample!.totalWarehouse1 + ingredientExample!.totalWarehouse2 + ingredientExample!.totalWarehouse3;

            await appDataSource.getRepository(Ingredients).save(ingredientExample!);
        }

        return true;

    } catch (error) {
        console.log("SOMETHING WENT WRONG " + error);
        throw error;
    }

}

export default recipeRouter;