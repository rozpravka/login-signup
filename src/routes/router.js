const express = require('express');
const bcrypt = require('bcrypt');
const flash = require('express-flash');
const passport = require('passport');
const session = require('express-session');

const User = require('../models/user.mongo');
const { createUser, initPassport } = require('./controller');

const router = express.Router();

initPassport(passport);

router.use(express.urlencoded({ extended: false }));
router.use(passport.initialize());
router.use(flash());
router.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
}));
router.use(passport.session());

router.get('/', (req, res) => {
    res.render('../src/views/home.ejs');
});

router.get('/signup', (req, res) => {
    res.render('../src/views/signup.ejs');
});

router.get('/login', (req, res) => {
    res.render('../src/views/login.ejs');
});

router.post('/signup', async (req, res) => {
    hashedPassword = await bcrypt.hash(req.body.password, 10);
    User.findOne({ email: req.body.email }).exec()
        .then(result => {
            if (result === null) {
                try {
                    createUser(req.body.username, req.body.email, hashedPassword);
                    console.log(`User { ${user.id}, ${user.name}, ${user.email} } successfully created.`);
                    res.redirect('/login');
                }
                catch (err) {
                    res.redirect('/signup');
                    console.log(err);
                }
            }
            else {
                console.log('User already exists.');
                res.redirect('/signup');
            }
        });
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
}));

module.exports = router;
