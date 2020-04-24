const express = require('express');
const app = express();

require('dotenv').config();

const bodyParser = require('body-parser');

const viewRoutes = require('./routes/viewairline');
const addRoutes = require('./routes/addairline');

app.use(bodyParser.urlencoded({ extended: false }));

/*const mysql = require('mysql');

const {
    HOST,
    PORT,
    USERNAME,
    PASSWORD,
    DATABASENAME,
} = process.env;

var con = mysql.createConnection({
    host: HOST,
    port: PORT,
    user: USERNAME,
    password: PASSWORD,
    database: DATABASENAME,
});

con.connect(function(err) {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log(`Connected to database. Host:Port -> ${HOST}:${PORT}`);
});

con.end();*/

app.use(addRoutes);
app.use(viewRoutes);

app.use((req, res, next) => {
    res.status(404).send('Invalid path!!!');
})

app.listen(3000, () => {
    console.log("Started the server at port 3000");
});