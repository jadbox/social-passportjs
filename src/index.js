require("dotenv").config();

const express = require('express')
const app = express()
const port = 8080

app.get('/', express.static('public'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));