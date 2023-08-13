# login-signup

## Introduction
---
This repository contains basic login-signup Node.js/MongoDB project. It incorporates libraries such as bcrypt for encrypting the password, 
passport and passport-local for username and password authentication, express-session for session management, express-flash to provide 
error messages and ejs for generating dynamic HTML content on the server-side (simple front-end).

## User instructions
---
1. Clone this project
2. Set up .env file
3. Install dependencies
4. Start the project

### Setting up .env file
---
Create .env file in the directory.
In the .env file include:
* ```MONGO_URL``` - a connect URL to your MongoDB database
* ```SESSION_KEY``` - a key used for signing and encrypting session data (can be a random string)

### Install dependencies
---
```npm install```

### Start the project
---
```npm start```
