import express from "express";
import AppDataSource from "../datasource";
import { User } from "../entities/user";

const UserRouter = express.Router()

UserRouter.use(express.json())

const appDataSource = AppDataSource;

// add async await if an error is sent back 
UserRouter.get("/", async (req, res) => {

    try {
        const items = await appDataSource.getRepository(User).find();
        res.json(items);
    } catch (error) {
        console.error("Error fetching user data", error);
        res.status(500).json({ error: 'Internal service error' });
    }

})

// get all User info
UserRouter.get("/", async (req, res) => {
    try {
        const users = await appDataSource.getRepository(User).find();
        res.json(users);
    } catch (error) {
        console.error("Error fetching all users", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// get single user
UserRouter.get("/:id", (req, res) => {

})

// create new user profile
UserRouter.put("/create", (req, res) => {
    const { name, isAdmin } = req.body;
})

// Update single user's info
// TypeORM searches for the Private key, and if it exists, it will change from create to update automatically.
UserRouter.put("/update/:id", async (req, res) => {

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

export default UserRouter;