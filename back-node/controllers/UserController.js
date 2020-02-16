const config = require('../config.json');
var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
const UserStudent = require("./userStudent.model");
const UserCompany = require("./userCompany.model");
const Company = require("./company.model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const ObjectId = require('mongodb').ObjectId;


const escapeStringRegexp = require('escape-string-regexp')

router.get('/', function (req, res) {
    db.collection('users').find().toArray(function(err, results) {
        res.json(results);
    })
});

router.post('/authenticate', authenticate);

function authenticate(req, res, next) {
    toAuthenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

router.post('/register', function(req, res, next) {    
    /*if (db.collection('users').findOne({ username: req.body.username })) {
        throw 'Username "' + req.body.username + '" is already taken';
    }*/
    let user = new Object();
    if(req.body.isStudent){
        user = new UserStudent(req.body);
    }else{
        user = new UserCompany(req.body)
        company = new Company(req.body)
    }
    // hash password
    if (req.body.password) {
        user.hash = bcrypt.hashSync(req.body.password, 10);
    }
    // save user
    //TODO: séparer les login de compagnie et les infos de l'entreprise dans 2 collections différentes.
    if(!req.body.isStudent){
        db.collection('companies').insertOne(company, function(err){
            if (err) return;
            // Object inserted successfully.
            user.idCompany = company._id; 
            console.log(user)
            db.collection('users').insertOne(user).then(() => res.json({}))
            .catch(err => next(err));
        })
        //.then(() => res.json({}))
        //.catch(err => next(err));
        
    }
    else{
        db.collection('users').insertOne(user).then(() => res.json({}))
        .catch(err => next(err));;
    }    
});

router.get('/current', function(req, res, next) {
    db.collection('users').findById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
});

router.get('/:id', function(req, res, next) {
    db.collection('users').findOne({_id: ObjectId(req.params.id)})
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
});

router.put('/:id', function(req, res, next) {
    const user = db.collection('users').findOne({_id: ObjectId(req.params.id)});
    // validate
    if (!user) throw 'User not found';
    if (user.username !== req.body.username && db.collection('users').findOne({ username: req.body.username })) {
        throw 'Username "' + req.body.username + '" is already taken';
    }
    // hash password if it was entered
    if (req.body.password) {
        req.body.hash = bcrypt.hashSync(req.body.password, 10);
    }
    // copy userParam properties to user
    Object.assign(user, req.body);

    user.save();
});

router.delete('/:id', function(req, res, next) {
    db.collection('users').deletefindByIdAndRemove(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
});

router.post('/addAlert', function(req, res, next){
    console.log("Request /users/addAlert")
    db.collection('users').update(
        { _id: ObjectId(req.body["user"]["_id"]) },
        { $set:
           {
            filterAlert: req.body["filter"],
           }
        }
     )
});

async function toAuthenticate({ username, password }) {
    const user = await db.collection('users').findOne({ username });
    //TODO ajout des autres champs avec user.idCompany
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user;
        const token = jwt.sign({ sub: user.id }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}

module.exports = router;