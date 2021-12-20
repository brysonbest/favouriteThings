const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const methodOverride = require('method-override');


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
    email: "admin@tinyapp.com",
    password: bcrypt.hashSync("password", 10),
    inventory: true
  },
};

//root entry at server redirects to homepage
app.get("/", (req, res) => {
  res.redirect('/main');
});

app.get("/main", (req, res) => {
  res.render('main');
});

app.listen(PORT, () => {
  console.log('Favourite Things Listening on Port', PORT);
})