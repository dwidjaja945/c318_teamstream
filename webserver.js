const express = require('express');
const mysql = require('mysql');
const webserver = express();

const credentials = require('./mysqlcredentials.js');
const database = mysql.createConnection(credentials);

const bodyParser = require('body-parser');

webserver.use(bodyParser.urlencoded({ extended: false }));
webserver.use(bodyParser.json());

webserver.use(express.static(__dirname + '/' + 'client'));

dataBase.connect(error => {
    if (error) throw error;
    console.log("Created connection to database");
});


// endpoint for athlete profile
require('./routes/athlete_profile')(webserver);

// endpoint for roster
require('./routes/roster')(webserver);


webserver.listen(3000, function() {
    console.log("Server listening on 3000");
})