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

const baseEndpoint = "/api/v1";

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
