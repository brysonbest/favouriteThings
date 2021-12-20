const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const methodOverride = require('method-override');
const {generateRandomString, findUser, findEmail, itemsInDatabase, loopID} = require('./helpers');


const app = express();
const PORT = 8080;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge: 24 * 60 * 60 * 1000
}));
app.use(methodOverride('_method'));

//initializes a database of items
const itemDatabase = {
};

//initializes a user database, with an initial admin entry for testing purposes
const users = {
  "admin": {
    id: "admin",
    email: "admin@favouritethings.com",
    password: bcrypt.hashSync("password", 10),
    supervisor: true,
    teamID: "testing"
  },
  "basicUser": {
    id: "basicUser",
    email: "basicuser@favouritethings.com",
    password: bcrypt.hashSync("password", 10),
    supervisor: false,
    teamID: "testing"
  },
};

//root entry at server redirects to homepage
app.get("/", (req, res) => {
  res.redirect('/main');
});

app.get("/main", (req, res) => {
  const userItems = itemsInDatabase(req.session.usrID, 'userID', itemDatabase);
  const templateVars = { items: userItems, username: (findUser(req.session.usrID, users))};
  res.render('main', templateVars);
});

//serves a registration page for unregistered/logged in users
app.get("/register", (req, res) => {
  const templateVars = {username: (findUser(req.session.usrID, users))};
  res.render("register", templateVars);
});

//serves a login page for previously registered users
app.get("/login", (req, res) => {
  const templateVars = {username: (findUser(req.session.usrID, users))};
  res.render("login", templateVars);
});


//allows a user to login by providing a username and password. Checks if these are in userdatabase, and if they match.
app.post("/login", (req, res) => {
  const username = req.body.email;
  const password = req.body.password;
  if (!findEmail(username, users)) {
    const templateVars = {username: undefined, errorCode: 'Error 403 - User Not Found'};
    return res.status(403).render('error', templateVars);
  }
  const userPass = findEmail(username, users)['password'];
  if (!bcrypt.compareSync(password, userPass)) {
    const templateVars = {username: (findUser(req.session.usrID, users)), errorCode: 'Error 403 - Password Does Not Match'};
    return res.status(403).render('error', templateVars);
  }
  const userID = findEmail(username, users)['id'];
  req.session.usrID = userID;
  res.redirect("/main");
});





app.listen(PORT, () => {
  console.log('Favourite Things Listening on Port', PORT);
})