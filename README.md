# login-signup

## Introduction
Markup :  - - - -
This repository contains basic login-signup Node.js/MongoDB project. It incorporates libraries such as bcrypt for encrypting the password, 
passport and passport-local for username and password authentication, express-session for session management, express-flash to provide 
error messages and ejs for generating dynamic HTML content on the server-side (simple front-end).

## User instructions
Markup :  - - - -
1. Clone this project
2. Set up .env file
3. Install dependencies
4. Start the project

### Setting up .env file
Markup :  - - - -
Create .env file in the directory.
In the .env file include:
Markup: *  Markup: ```MONGO_URL``` - a connect URL to your MongoDB database
Markup: *  Markup: ```SESSION_KEY``` - secret key used for signing and encrypting session data in your Express.js application (can be random string)

### Install dependencies
Markup :  - - - -
Markup: ```npm install```

### Start the project
Markup :  - - - -
Markup: ```npm start```
