const config = require('../config.json');
var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
const Company = require("./company.model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var ObjectId = require('mongodb').ObjectId

const escapeStringRegexp = require('escape-string-regexp')

router.get('/', function(req, res, next) {
    db.collection('companies').find().toArray(function(err, results){
        res.json(results)
    })
});


router.get('/:id', function(req, res, next) {
    const oid = new ObjectId(req.params.id)
    db.collection('companies').findOne({_id : oid})
        .then(company => company ? res.json(company) : res.sendStatus(404))
        .catch(err => next(err));
});

module.exports = router;