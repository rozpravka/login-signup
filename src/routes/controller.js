const User = require('../models/user.mongo');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

async function createUser(name, email, password) {
    const user = new User({ name: name, email: email, password: password });
    try {
        await user.save();
        console.log('User created.');
    } 
    catch (err) {
        console.log(err);
    }
}

async function authenticate(email, password, done) {
    const query = User.findOne({ email: email });
    console.log(query);
    query.exec().then(user => {
        console.log(user);
        if (user === null) {
            return done(null, false, { message: `User with this email haven't been registered.` });
        } 
        try {
            if (bcrypt.compare(password, user.password)) {
                return done(null, user);
            }
            else {
                return done(null, false, { message: 'Password incorrect.' });
            }
        } 
        catch (err) {
            return done(err);
        }
    })
}

function initPassport(passport) {
    passport.use(new localStrategy({ usernameField: 'email', passwordField: 'password' }, authenticate));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
        User.findById(id).exec().then(user => {
            return done(null, user);
        })
    });
}

module.exports = {
    createUser,
    initPassport,
};