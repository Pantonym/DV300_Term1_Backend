import express from "express";
import AppDataSource from "../datasource";
import { User } from "../entities/user";
import * as bcrypt from 'bcrypt';

const UserRouter = express.Router()

UserRouter.use(express.json())

const appDataSource = AppDataSource;

// add async await if an error is sent back 

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

// Post endpoint for user creation
UserRouter.post("/addUser", async (req, res) => {
    try {

        const { email, password, isAdmin } = req.body;

        var newUser = new User();

        newUser.email = email;
        newUser.password = password;
        newUser.isAdmin = isAdmin;

        var addedUser = await appDataSource.getRepository(User).save(newUser);

        return res.json(addedUser);

    } catch (error) {
        console.log("SOMETHING WENT WRONG");
        return res.status(500).json({ message: error });
    }
})

// Post endpoint for login
// Admin login info: glen@gmail.com; glen
// Non-Admin login info: john@gmail.com; john
UserRouter.post('/login', async (req, res) => {
    try {

        // get email & password from the http request
        const { email, password } = req.body;

        // if both of these variables exist
        if (email && password) {

            // find the user by their email
            let userRequest = await appDataSource.getRepository(User).findOneBy({ email: email });

            if (!userRequest) { //cant find the user

                return res.status(404).json({ message: "Invalid Credentials" })

            } else { //the email is correct

                // check if the passwords match
                bcrypt.compare(password, userRequest.password, (error, result) => {
                    // result will be true or false
                    if (result) { //passwords match

                        userRequest!.password = "Protected by SpyNet"; //set the password to empty to not expose it. This protects user information. This will not save the password to an empty string as it does not call the .save function.
                        return res.json(userRequest) //send the user data if login is a success

                    } else { //passwords do not match

                        return res.status(500).json({ message: "Invalid Credentials" })

                    }
                })

            }

        } else {//the values are empty/do not exist

            return res.status(500).json({ message: "Invalid Credentials" })

        }

    } catch (error) {
        console.log("SOMETHING WENT WRONG");
        return res.status(500).json({ message: error });
    }
})

export default UserRouter;