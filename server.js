
// Get dependencies
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
var multer = require('multer'); //include multer package for image uploading

// var mysql = require('mysql');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// // Setup MySQL Connection
// app.use(function (req, res, next) {

//     res.mysqlCon = mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         port: 3305,
//         password: 'm2n1shlko',
//         database: 'testingdb',
//         multipleStatements: true,
//         debug: false
//     });

//     res.mysqlCon.connect(function (err) {
//         console.log("Connected");
//         if (err) {
//             console.log(err);
//         }
//     });
//     res.mysqlCon.on('error', function (err) {
//         if (err) {
//             console.log(err);
//         }
//     });

//     next();
// });


// API file for interacting with Sql server
const api = require('./server/routes/api');

// // API file for interacting with mySql server
// const api = require('./server/routes/apimysql');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// // Angular public output folder
// app.use('/public', express.static(path.join(__dirname, 'public')))

// API location
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Set Port
const port = process.env.PORT || '3001';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));
