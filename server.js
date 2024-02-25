const express = require('express');
const uuidv4 = require('uuid').v4;
const cookieParser = require('cookie-parser');

const data = require('./data');
const views = require('./views');

const app = express();

const PORT = 3000;

app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());

app.use(express.static('./public'));

app.get('/', (req, res) => {
    // If the user is not logged in, sent a login page
    const sid = req.cookies.sid;
    if (!data.getUsername(sid)) {
        res.send(views.loginPage());
        return;
    }
    
    // If the user is logged in, send the home page
    const username = data.getUsername(sid);
    
    // Set user data is empty if it's undefined
    let userData = data.getUserData(username);
    if (!userData || !userData.secretWord) {
        data.resetUserData(username);
        userData = data.getUserData(username);
    }
    res.send(views.homePage({username, userData}));

});

app.post('/login', (req, res) => {
    const username = req.body.username.trim();
    // If the username is invalid (including "dog"), respond with a login form that contains a message about the username being invalid
    if (!username || !username.match(/^\w+$/) || username === 'dog') {
        res.send(views.loginPage('invalidUsername'));
        return;
    }
    // If the username is valid, create a new session and redirect to the Home Page
    const sid = uuidv4();
    data.addSession({sid, username});
    res.cookie('sid', sid);
    res.redirect('/');
    
});

app.post('/logout', (req, res) => {
    // Remove the session and cookie, then redirect to the Home Page
    const sid = req.cookies.sid;
    data.removeSession(sid);
    res.clearCookie('sid');
    res.redirect('/');
});

app.post('/guess', (req, res) => {
    // Check for a valid session id. If there is not a valid session id, the page will display a message and a login form
    const sid = req.cookies.sid;
    if (!data.getUsername(sid)) {
        res.send(views.loginPage('invalidSid'));
        return;
    }

    const username = data.getUsername(sid);
    const userData = data.getUserData(username);
    
    // Check for a valid guess
    const guess = req.body.guess.trim().toLowerCase();
    const possibleWords = userData.possibleWords;
    
    if (!validateGuess(guess, possibleWords)) {  
        updateUserData(userData, guess, 'invalid guess', 0);
        res.redirect('/');
        return;
    }

    // Compare guess and secretWord and return the number of letters that are the same
    const secretWord = userData.secretWord;
    if (secretWord.toLowerCase() === guess) {
        updateUserData(userData, guess, 'win', 1); 
        res.redirect('/');
        return;
    }

    const correctLetters = compare(secretWord, guess);
    updateUserData(userData, guess, correctLetters, 1);    
    res.redirect('/');
    return;
    
});

function validateGuess(guess, possibleWords) {
    for (let i = 0; i < possibleWords.length; i++) {
        if (possibleWords[i].toLowerCase() === guess.toLowerCase()) {
            possibleWords.splice(i, 1);
            return true;
        }
    }
    return false;
}

function compare(word, guess) {
    let matches = 0;
    const letterCount = {};

    for ( const letter of word.toLowerCase()) {
        letterCount[letter] = 
            letterCount[letter] ? letterCount[letter] + 1 : 1;
    }

    for (const letter of guess.toLowerCase()) {
        if (letterCount[letter]) {
            matches++;
            letterCount[letter]--;
        }
    }
    return matches;
}

function updateUserData(userData, guess, correctLetters, attempt) {
    userData.guessedWords.push({word: guess, correctLetters});  
    userData.lastGuess = userData.guessedWords[userData.guessedWords.length - 1];
    userData.attempts += attempt;    
}

app.post('/new-game', (req, res) => {
    // Check for a valid session id. If there is not a valid session id, the page will display a message and a login form
    const sid = req.cookies.sid;
    if (!data.getUsername(sid)) {
        res.send(views.loginPage('invalidSid'));
        return;
    }

    // Update the state and redirect to the Home Page
    data.resetUserData(data.getUsername(sid));
    res.redirect('/');    
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});