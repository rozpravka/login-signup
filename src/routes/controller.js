const User = require('../models/user.mongo');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

async function createUser(name, email, password) {
    const user = new User({ 
            name: name,
            email: email,
            password: password,
    });
    try {
        await user.save();
        console.log(`User: ${user} has been created.`);
    } 
    catch (err) {
        console.log(err);
    }
}

function checkIfLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

function checkIfNotLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();
}

async function authenticate(email, password, done) {
    const user = await User.findOne({ email: email }).exec();
    if (user === null) {
        console.log(`User with this email hasn't been registered.`)
        return done(null, false, { message: `User with this email hasn't been registered.` });
    }
    try {
        if (await bcrypt.compare(password, user.password)) {
            return done(null, user);
        }
        else {
            return done(null, false, { message: `Incorrect password.` });
        }
    }
    catch (err) {
        console.log(err);
        return done(err);
    }
}

function initPassport(passport) {
    passport.use(new localStrategy({ usernameField: 'email', passwordField: 'password' }, authenticate));
    passport.serializeUser((user, done) => done(null, user._id));
    passport.deserializeUser(async (id, done) => {
        const user = await User.findById(id).exec();
        return done(null, user);
    });
}

module.exports = {
    checkIfLoggedIn,
    checkIfNotLoggedIn,
    createUser,
    initPassport,
};