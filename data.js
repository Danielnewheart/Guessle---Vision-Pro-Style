const words = require('./words');

const sessions = {}; // sid => username
const userData = {}; // username => game state

/*
userDataSample = {
    secretWord: 'apple',
    possibleWords: ['apple', 'banana', 'cherry', 'date'],
    guessedWords: [{word: 'orange', correctLetters: 2}, {word: 'lemon', correctLetters: 2}, {word: 'pear', correctLetters: 3}],
    attempts: 3,    
}
*/

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function addSession({ sid, username }) { 
  sessions[sid] = {'username': username};

  return sessions;
}

function removeSession(sid) {
    delete sessions[sid];
}

function getUsername(sid) {
  if (!sessions[sid]) {
    return '';
  }
  return sessions[sid].username;
}

function getUserData(username) {
    return userData[username];
}

function resetUserData(username) {
    userData[username] = {}; 
    userData[username].secretWord = words[getRandomInt(words.length)];
    userData[username].possibleWords = [...words];
    userData[username].guessedWords = [];
    userData[username].attempts = 0;
    userData[username].lastGuess = {word: '', correctLetters: 0};

    // Show the username and the chosen secret word
    console.log(`
    username: ${username}
    secret word: ${userData[username].secretWord}
    `);
}

const data = {
  sessions,
  userData,
  addSession,
  removeSession,
  getUsername,
  getUserData,
  resetUserData
}

module.exports = data;