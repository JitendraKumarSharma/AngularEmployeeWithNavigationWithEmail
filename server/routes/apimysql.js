
const express = require('express');
const router = express.Router();
var path = require('path');
var multer = require('multer'); //include multer package for image uploading

var mysql = require('mysql');

// var mysqlCon = mysql.createConnection({
//     host: 'sql10.freesqldatabase.com',
//     user: 'sql10224937',
//     port: 3306,
//     password: '2ITNf8swbs',
//     database: 'sql10224937',
//     multipleStatements: true,
//     debug: false
// });

var mysqlCon = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3305,
    password: 'm2n1shlko',
    database: 'testingdb',
    multipleStatements: true,
    debug: false
});

mysqlCon.connect();

// Get All Employee
router.get('/employees', (req, res) => {

    mysqlCon.query('CALL GetAllEmployee', function (err, recordset) {
        if (err) {
            console.log(err)
        }
        // send records as a response
        res.send(recordset);
    });

});

// Get Employee By EmpId
router.get('/employees/:EmpId', (req, res) => {

    mysqlCon.query('SELECT * from Employee where EmpId=' + req.query.EmpId, function (err, recordset) {

        if (err) {
            console.log(err)
        }

        // send records as a response
        res.send(recordset);

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

    mysqlCon.query("CALL InserOrtUpdateEmployee(?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [EmpId, Name, Age, CountryId, StateId, Email, City, ZipCode, Mobile, Gender, IsMarried, DOB, EmpImage],
        function (err, recordset) {

            if (err) {
                console.log(err)
            }

            // send records as a response
            res.send(recordset);

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

    mysqlCon.query("CALL InserOrtUpdateEmployee(?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [EmpId, Name, Age, CountryId, StateId, Email, City, ZipCode, Mobile, Gender, IsMarried, DOB, EmpImage],
        function (err, recordset) {

            if (err) {
                console.log(err)
            }

            // send records as a response
            res.send(recordset);

        });
});

//Delete Employee By EmpId
router.delete('/employees/:EmpId', (req, res) => {
    mysqlCon.query('Delete from Employee where EmpId=' + req.query.EmpId + '; select ' + req.query.EmpId + ' as EmpId', function (err, recordset) {

        if (err) {
            console.log(err)
        }

        // send records as a response
        res.send(recordset);

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
//////////////////////////Upload Image End

router.get('/getAllCountry', function (req, res) {

    //mysqlCon.query('SELECT * from Country', function (err, recordset) {
    mysqlCon.query('CALL GetAllCountry', function (err, recordset) {
        if (err) {
            console.log(err)
        }
        // send records as a response
        res.send(recordset);
    });
});

router.get('/getStateByCountry/:CountryId', (req, res) => {

    mysqlCon.query('select StateId, StateName from StateMaster where CountryId=' + req.query.CountryId, function (err, recordset) {
        if (err) {
            console.log(err)
        }
        // send records as a response
        res.send(recordset);

    });
});

module.exports = router;