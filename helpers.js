//generates a random alphanumeric string of 6 characters
const generateRandomString = function() {
  let randomString = "";
  let characterBase = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let i = 0; i < 6; i++) {
    randomString += characterBase[((Math.round(Math.random() * (characterBase.length - 1))))];
  }
  return randomString;
};

//finds the user using the userID
const findUser = function(userID, userbase) {
  if (userbase[userID]) {
    return userbase[userID];
  }
};

//finds the user using the given email address/username
const findEmail = function(username, userbase) {
  for (const user in userbase) {
    if (userbase[user]['email'] === username) {
      return userbase[user];
    }
  }
};

//identifies the urls that are connected to a specific userID
const itemsInDatabase = function(id, identifier, database) {
  let userItems = {};
  for (let url in database) {
    if (database[url][identifier] === id) {
      userItems[url] = database[url];
    }
  }
  return userItems;
};

//loops through a given id, and if the callback function is truthy, regenerates the given id's value
const loopID = function(id, callback) {
  if (callback) {
    id = generateRandomString();
    loopID();
  }
};

module.exports = {generateRandomString, findUser, findEmail, itemsInDatabase, loopID};