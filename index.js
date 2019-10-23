const config = require('config');
const mongoose = require('mongoose');
const usersRoute = require('./routes/users.route');
const express = require('express');
const app = express();

//We will get the private key using config module. If we can't find any, the application will end.
if (!config.get("myprivatekey")) {
    console.error("ERROR: no se ha encontrado llave.");
    process.exit(1);
}

// connecting to MongoDB 
mongoose
    .connect("mongodb://localhost/nodejsauth", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/api/users", usersRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))