require("dotenv").config();

const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
const PORT = 4000;

app.use(express.json()); // enable body in json format
app.use(
    fileUpload({
        useTempFiles: true
    })
); // enable body in form-data format

const errorResponseHandler = require("./middlewares/error-response-handler.js");
const carRoute = require("./routes/car-route.js");

const baseEndpoint = "/api/v1";

app.use(`${baseEndpoint}/cars`, carRoute);
app.use((err, _, res, __) => errorResponseHandler(err, res));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
