import { DataSource } from "typeorm";

const AppDataSource = new DataSource(
    {
        "type": "postgres",
        "host": "localhost",
        "port": 5432,
        "username": "postgres",
        "database": "spynet",
        "password": "1234",
        "entities": ["src/entities/**"],
        "logging": true,
        "synchronize": true
    }
);

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

export default AppDataSource;