const views = {
    loginPage: (status) => {
        return `
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Guessle - Login</title>
                <link rel="stylesheet" href="/styles.css">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <script src="script.js" defer ></script>
            </head>
            <body>
                <div id="background"></div>    
                <div class="window">
                    <h1 class="header">Guessle</h1>
                    <h2 class="subheader">login</h2>
                    ${status === 'invalidSid' ? '<span class="error">You have been logged out because of invalid session.</span>' : ''}
                    ${status === 'invalidUsername' ? '<span class="error">Invalid Username</span>' : ''}
                    <form class="login-form" action="/login" method="POST">
                        <label class="login-form__label" for="username">Username</label>
                        <input class="login-form__input" type="text" id="username" name="username">
                        <button class="login-form__buttton" type="submit">Login</button>
                    </form>
                    <span class="allow-list">Only allowing A-Z, a-z, 0-9, _(underscore)</span>
                </div>
                <button id="toggleBackground">Change Background</button>
            </body>
            </html>
        `;
    },
    homePage: ({username, userData}) => {    
        let nextStep = '';
        if (userData.lastGuess.correctLetters === 'win') {
            nextStep = `<p>Congratulation! You've won this game. Please start a new game.</p>`
        }
        else {
            nextStep = `<form action="/guess" method="POST">
                            <label for="guess">Next Guess:</label>
                            <input class="guess-input" type="text" id="guess" name="guess" autofocus>
                            <button type="submit">Submit</button>
                        </form>`
        }

        return `
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Guessle</title>
                <link rel="stylesheet" href="/styles.css">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <script src="script.js" defer ></script>
            </head>
            <body>
                <div id="background"></div>
                <div class="window window--main">
                    <section class="attempt-panel">
                        <header class="header-section">
                            <h2 class="header-section__title">History</h2>
                        </header>
                        <span class="subheader">Attempts: ${userData.attempts}</span>
                        <div class="container container--guessed">
                            <ul class="guessed-word-list">
                                ${userData.guessedWords.map(guess => `<li>${guess.word} - ${guess.correctLetters}</li>`).join('')}
                            </ul>
                        </div>
                    </section>
                    <div class="main-panel">
                        <header class="header-section">
                            <h1 class="header-section__title header-section__title--independent">Guessle</h1>
                            <form class="header-section__item" action="/new-game" method="POST">
                                <button type="submit">Start a new game</button>
                            </form>
                            <form class="header-section__item" action="/logout" method="POST">
                                <button type="submit">Logout</button>
                            </form>
                        </header>
                            <section class="possible">
                                <h2 class="subheader">Possible Words</h2>
                                <div class="container container--possible">
                                    ${userData.possibleWords.map(word => `<div class="possible-word">${word}</div>`).join('')}
                                </div>
                            </section>
                    </div>
                </div>
                <div class="window user-input-window">
                    <p class="last-guess">${userData.lastGuess.word ? `Last Guess: ${userData.lastGuess.word} - ${userData.lastGuess.correctLetters}` : `You haven't made any guesses yet.`}</p>
                    ${nextStep}
                </div>
                <button id="toggleBackground">Change Background</button>
            </body>
            </html>
        `;
    }

};

module.exports = views;