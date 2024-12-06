const WORDS = ['ocean', 'games', 'boats', 'lungs', ''];
const secret = WORDS[Math.floor(Math.random() * WORDS.length)];
let currentGuess = '';
let currentRow = 0;
let isGameOver = false;

const game = document.getElementById('game');
const credits = document.getElementById('credits');
const themeToggleBtn = document.getElementById('theme-toggle');
const submitGuessBtn = document.getElementById('submit-guess');

const creditsData = [
    ' Gael Dupuy de lôme : Team Leader + Sprite Designer',
    ' Pierre Melo : Credits + Infra',
    ' Tom Romao : KonamiCode + Graphics',
    ' Evan Thibault : Captcha + Text'
];

function createBoard() {
    for (let i = 0; i < 6; i++) {
        const row = document.createElement('div');
        row.className = 'row';
        for (let j = 0; j < 5; j++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            row.appendChild(tile);
        }
        game.appendChild(row);
    }
}

function createCredits() {
    creditsData.forEach(line => {
        const lineDiv = document.createElement('div');
        lineDiv.className = 'credit-line';
        for (let char of line) {
            const charSpan = document.createElement('span');
            charSpan.textContent = char;
            if (/[a-zA-Z]/.test(char)) {
                charSpan.className = 'letter';
                charSpan.addEventListener('click', () => handleLetterClick(char));
            } else {
                charSpan.className = 'non-letter';
            }
            lineDiv.appendChild(charSpan);
        }
        credits.appendChild(lineDiv);
    });
}

function updateBoard() {
    const rows = document.getElementsByClassName('row');
    const tiles = rows[currentRow].getElementsByClassName('tile');
    for (let i = 0; i < 5; i++) {
        tiles[i].textContent = currentGuess[i] ? currentGuess[i].toUpperCase() : '';
    }
}

function checkGuess() {
    if (currentGuess.length !== 5) {
        alert('Please enter a 5-letter word.');
        return;
    }

    const rows = document.getElementsByClassName('row');
    const tiles = rows[currentRow].getElementsByClassName('tile');

    let guessArray = currentGuess.split('');
    let secretArray = secret.split('');

    // First pass: Correct letters in correct positions
    for (let i = 0; i < 5; i++) {
        if (guessArray[i] === secretArray[i]) {
            tiles[i].classList.add('correct');
            updateLetterStatus(guessArray[i], 'correct');
            guessArray[i] = secretArray[i] = null;
        }
    }

    // Second pass: Correct letters in wrong positions
    for (let i = 0; i < 5; i++) {
        if (guessArray[i] && secretArray.includes(guessArray[i])) {
            tiles[i].classList.add('present');
            updateLetterStatus(guessArray[i], 'present');
            secretArray[secretArray.indexOf(guessArray[i])] = null;
        } else if (guessArray[i]) {
            tiles[i].classList.add('absent');
            updateLetterStatus(guessArray[i], 'absent');
        }
    }

    if (currentGuess === secret) {
        setTimeout(() => {
            alert('Congratulations! You guessed the word.');
        }, 200);
        isGameOver = true;
        document.removeEventListener('keydown', handleKeydown);
    } else if (currentRow === 5) {
        setTimeout(() => {
            alert(`Game Over! The word was "${secret.toUpperCase()}".`);
        }, 200);
        isGameOver = true;
        document.removeEventListener('keydown', handleKeydown);
    } else {
        currentGuess = '';
        currentRow++;
    }
}

function handleLetterClick(char) {
    if (isGameOver) return;

    char = char.toLowerCase();
    if (currentGuess.length < 5 && /^[a-zA-Z]$/.test(char)) {
        currentGuess += char;
        updateBoard();
    }
}

function handleKeydown(e) {
    if (isGameOver) return;

    let key = e.key;
    if (key === 'Enter') {
        checkGuess();
    } else if (key === 'Backspace') {
        currentGuess = currentGuess.slice(0, -1);
        updateBoard();
    } else if (/^[a-zA-Z]$/.test(key)) {
        if (currentGuess.length < 5) {
            currentGuess += key.toLowerCase();
            updateBoard();
        }
    }
}

function updateLetterStatus(letter, status) {
    const letterElements = document.querySelectorAll(`#credits .letter`);
    letterElements.forEach(elem => {
        if (elem.textContent.toLowerCase() === letter) {
            if (!elem.classList.contains('correct')) {
                elem.classList.remove('absent', 'present');
                elem.classList.add(status);
            }
        }
    });
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        themeToggleBtn.textContent = 'Switch to Light Mode';
    } else {
        themeToggleBtn.textContent = 'Switch to Dark Mode';
    }
}

// Fetch and display commit statistics
function fetchCommitStats(repoOwner, repoName) {
    const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const commitCounts = {};

            data.forEach(contributor => {
                commitCounts[contributor.login] = contributor.contributions;
            });

            displayCommitStats(commitCounts);
        })
        .catch(error => {
            console.error('Error fetching commit data:', error);
            displayCommitStats(null);
        });
}

function displayCommitStats(commitCounts) {
    const statsBoard = document.getElementById('stats-board');
    statsBoard.innerHTML = '<h2>Commit Statistics</h2>';

    if (commitCounts) {
        const list = document.createElement('ul');

        for (const author in commitCounts) {
            const listItem = document.createElement('li');
            listItem.textContent = `${author}: ${commitCounts[author]} commits`;
            list.appendChild(listItem);
        }
        statsBoard.appendChild(list);
    } else {
        statsBoard.innerHTML += '<p>Unable to fetch commit data.</p>';
    }
}

// Replace 'repo-owner' and 'repo-name' with actual GitHub repository details
fetchCommitStats('Avaritiainme', 'NDI_2025');

createBoard();
createCredits();
document.addEventListener('keydown', handleKeydown);
themeToggleBtn.addEventListener('click', toggleTheme);
submitGuessBtn.addEventListener('click', checkGuess);