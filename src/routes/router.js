const express = require('express');
const bcrypt = require('bcrypt');
const flash = require('express-flash');
const passport = require('passport');
const session = require('express-session');

const User = require('../models/user.mongo');
const { checkIfLoggedIn, checkIfNotLoggedIn, createUser, initPassport } = require('./controller');

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

router.get('/', checkIfLoggedIn, (req, res) => {
    res.render('../src/views/home.ejs', { name: req.user.name });
});

router.get('/signup', checkIfNotLoggedIn, (req, res) => {
    res.render('../src/views/signup.ejs');
});

router.get('/login', checkIfNotLoggedIn, (req, res) => {
    res.render('../src/views/login.ejs');
});

router.post('/signup', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const registered = await User.findOne({ email: req.body.email }).exec();
    if (registered === null) {
        try {
            await createUser(req.body.username, req.body.email, hashedPassword);
            res.redirect('/login');
        }
        catch (err) {
            res.redirect('/signup');
            console.log(err);
        }
    }
    else {
        console.log('User already exists.');
        req.flash('error', 'User already exists.');
        res.redirect('/signup');
    }
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
}));

router.post('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
});

module.exports = router;
