
const express = require('express');
const router = express.Router();
var path = require('path');
var multer = require('multer'); //include multer package for image uploading
//var nodemailer = require('nodemailer');
const email = require("emailjs/email");

var sql = require("mssql");
// config for your database
// var config = {
//     user: 'sa',
// password: 'sa@123xxx',
// server: 'DESKTOP-KBSC7C0\\SQLEXPRESS',
//     database: 'TestingDB'
// };

var config = {
    user: 'sa',
    password: 'm2n1shlko',
    server: 'P0022',
    database: 'TestingDB'
};

// var config = {
//     user: 'kpt1',
//     password: 'robert@0522#',
//     server: '172.24.16.196',
//     database: 'RecipeCosting_Magnolia'
// };

// Get All Employee
router.get('/employees', (req, res) => {

    // connect to your database
    sql.connect(config, function (err) {

        if (err) {
            console.log(err);
        }

        // create Request object
        var request = new sql.Request();

        // query to the database and get the records
        //request.query('SELECT * from Employee', function (err, recordset) {
        request.execute("GetAllEmployee", function (err, recordset) {

            if (err) {
                console.log(err)
            }

            // send records as a response
            res.send(recordset);

        });
    });
});

// Get Employee By EmpId
router.get('/employees/:EmpId', (req, res) => {

    // connect to your database
    sql.connect(config, function (err) {

        if (err) {
            console.log(err);
        }

        // create Request object
        var request = new sql.Request();
        // query to the database and get the records
        request.query('SELECT * from Employee where EmpId=' + req.query.EmpId, function (err, recordset) {

            if (err) {
                console.log(err)
            }

            // send records as a response
            res.send(recordset);

        });
    });
});

//Insert Employee
router.post('/employees', (req, res) => {

    var EmpId = req.body.params.emp.EmpId;
    if (EmpId == null || EmpId == "" || EmpId === undefined) {
        EmpId = 0;
    }
    var Name = req.body.params.emp.Name;
    var Email = req.body.params.emp.Email;
    var Age = req.body.params.emp.Age;
    var CountryId = req.body.params.emp.CountryId;
    var StateId = req.body.params.emp.StateId;
    var City = req.body.params.emp.City;
    var ZipCode = req.body.params.emp.ZipCode;
    var Mobile = req.body.params.emp.Mobile;
    var Gender = req.body.params.emp.Gender;
    var IsMarried = req.body.params.emp.IsMarried;
    var DOB = new Date(req.body.params.emp.DOB);
    var EmpImage = req.body.params.emp.EmpImage;

    //connect to your database
    var dbConn = new sql.Connection(config);

    dbConn.connect().then(function () {

        var request = new sql.Request(dbConn);

        request.input('EmpId', sql.Int, EmpId)
            .input('Name', sql.VarChar, Name)
            .input('Email', sql.VarChar, Email)
            .input('Age', sql.Int, Age)
            .input('CountryId', sql.Int, CountryId)
            .input('StateId', sql.Int, StateId)
            .input('City', sql.VarChar, City)
            .input('ZipCode', sql.VarChar, ZipCode)
            .input('Mobile', sql.VarChar, Mobile)
            .input('Gender', sql.VarChar, Gender)
            .input('IsMarried', sql.Bit, IsMarried)
            .input('DOB', sql.Date, DOB)
            .input('EmpImage', sql.VarChar, EmpImage)
            .execute("InserOrtUpdateEmployee").then(function (recordSet) {
                res.send(recordSet);
                dbConn.close();
            }).catch(function (err) {
                console.log(err);
                dbConn.close();
            });
    }).catch(function (err) {
        console.log(err);
    });
});

//Update Employee
router.put('/employees', (req, res) => {

    var EmpId = req.body.params.emp.EmpId;
    var Name = req.body.params.emp.Name;
    var Email = req.body.params.emp.Email;
    var Age = req.body.params.emp.Age;
    var CountryId = req.body.params.emp.CountryId;
    var StateId = req.body.params.emp.StateId;
    var City = req.body.params.emp.City;
    var ZipCode = req.body.params.emp.ZipCode;
    var Mobile = req.body.params.emp.Mobile;
    var Gender = req.body.params.emp.Gender;
    var IsMarried = req.body.params.emp.IsMarried;
    var DOB = new Date(req.body.params.emp.DOB);
    var EmpImage = req.body.params.emp.EmpImage;

    // console.log('hi');
    // let transporter = nodeMailer.createTransport({
    //     host: 'smtp.gmail.com',
    //     port: 465,
    //     secure: true,
    //     auth: {
    //         user: 'jeetsharma8390@gmail.com',
    //         pass: 'Jeet123xxx@$'
    //     }
    // });
    // let mailOptions = {
    //     from: 'jeetsharma8390@gmail.com', // sender address
    //     to: 'jeetusharma.jee@gmail.com', // list of receivers
    //     subject: 'Testing', // Subject line
    //     text: 'Hello Doe', // plain text body
    //     html: '<b>NodeJS Email Tutorial</b>' // html body
    // };

    // transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //         return console.log(error);
    //     }
    //     console.log('Message %s sent: %s', info.messageId, info.response);
    // });

    //connect to your database
    var dbConn = new sql.Connection(config);

    dbConn.connect().then(function () {

        var request = new sql.Request(dbConn);

        request.input('EmpId', sql.Int, EmpId)
            .input('Name', sql.VarChar, Name)
            .input('Email', sql.VarChar, Email)
            .input('Age', sql.Int, Age)
            .input('CountryId', sql.Int, CountryId)
            .input('StateId', sql.Int, StateId)
            .input('City', sql.VarChar, City)
            .input('ZipCode', sql.VarChar, ZipCode)
            .input('Mobile', sql.VarChar, Mobile)
            .input('Gender', sql.VarChar, Gender)
            .input('IsMarried', sql.Bit, IsMarried)
            .input('DOB', sql.Date, DOB)
            .input('EmpImage', sql.VarChar, EmpImage)
            .execute("InserOrtUpdateEmployee").then(function (recordSet) {
                res.send(recordSet);
                dbConn.close();
            }).catch(function (err) {
                console.log(err);
                dbConn.close();
            });
    }).catch(function (err) {
        console.log(err);
    });
});

//Delete Employee By EmpId
router.delete('/employees/:EmpId', (req, res) => {

    //connect to your database
    var dbConn = new sql.Connection(config);

    dbConn.connect().then(function () {

        // create Request object
        var request = new sql.Request(dbConn);

        // query to the database and get the records
        request.query('Delete from Employee where EmpId=' + req.query.EmpId + '; select ' + req.query.EmpId + ' as EmpId')
            .then(function (recordSet) {
                res.send(recordSet);
                dbConn.close();
            }).catch(function (err) {
                console.log(err);
                dbConn.close();
            });
    });
});

//Upload Image
var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./dist/assets/images/employeeimages");
    },
    filename: function (req, file, callback) {
        //ImageName = file.fieldname + "_" + Date.now() + "_" + file.originalname;
        ImageName = Date.now() + "_" + file.originalname;

        callback(null, ImageName);
    }
});
router.post('/upload', function (req, res, next) {
    var upload = multer({
        storage: Storage,
        fileFilter: function (req, file, callback) {
            var ext = path.extname(file.originalname)
            if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
                return callback(res.end('Only images are allowed'), null)
            }
            callback(null, true)
        }
    }).single('photo');
    upload(req, res, function (err) {
        res.send(JSON.stringify(ImageName));
    });
});

router.get('/getAllCountry', (req, res) => {
    //connect to your database
    var dbConn = new sql.Connection(config);

    dbConn.connect().then(function () {

        // create Request object
        var request = new sql.Request(dbConn);

        // query to the database and get the records
        request.execute('GetAllCountry')
            .then(function (recordSet) {
                res.send(recordSet);
                dbConn.close();
            }).catch(function (err) {
                console.log(err);
                dbConn.close();
            });
    });
});

router.get('/getStateByCountry/:CountryId', (req, res) => {
    //connect to your database
    var dbConn = new sql.Connection(config);

    dbConn.connect().then(function () {

        // create Request object
        var request = new sql.Request(dbConn);

        // query to the database and get the records
        request.query('select StateId, StateName from StateMaster where CountryId=' + req.query.CountryId)
            .then(function (recordSet) {
                res.send(recordSet);
                dbConn.close();
            }).catch(function (err) {
                console.log(err);
                dbConn.close();
            });
    });
});

router.post('/SendEmail', (req, res) => {

    var Name = req.body.params.emp.Name;

    //EXAMPLE USAGE - html emails and attachments
    var server = email.server.connect({
        user: "jeetsharma8390@gmail.com",
        password: "Jeet123xxx@$",
        host: "smtp.gmail.com",
        ssl: true
    });

    var message = {
        text: Name + " is registered successfully!!",
        from: "Jitendra <jeetsharma8390@gmail.com>",
        to: "Jeetu <jeetusharma.jee@gmail.com>",
        //cc: "else <else@your-email.com>",
        subject: "testing emailjs",
        attachment:
            [
                //{ data: "<html>i <i>hope</i> this works!</html>", alternative: true },
                { data: "<html>i <i>hope</i> this works! here is an image: <img src='cid:my-image' width='100' height ='50'> </html>" },
                { path: "F:\\ExpressApp\\EmailApp\\test.rar", type: "application/rar", name: "test.rar" },// For rar files
                //{ path: "path/to/file.zip", type: "application/zip", name: "renamed.zip" },//For zip files
                { path: "F:\\ExpressApp\\EmailApp\\blank.png", type: "image/jpg", headers: { "Content-ID": "<my-image>" } }
            ]
    };

    server.send(message, function (err, message) { console.log(err || message); });
});

module.exports = router;