let player1Name = prompt("Enter Player 1's name:");
let player2Name = prompt("Enter Player 2's name:");
const board = document.getElementById('board');
const shadowGameBoard = [null, null, null, null, null, null, null, null, null];
let currentPlayer = 1;

function theGame(process) {
    const correctBox = process.target;
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    if (correctBox.innerText.length < 1) {
        const letter = theCharacters();
        const char = document.createTextNode(letter);
        correctBox.appendChild(char);
        const choosenIndex = parseInt(correctBox.dataset.boxNumber);
        shadowGameBoard.splice(choosenIndex, 1, letter);
    }

    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];

        if (shadowGameBoard[a] !== null && shadowGameBoard[a] === shadowGameBoard[b] && shadowGameBoard[a] === shadowGameBoard[c]) {
            const winner = currentPlayer === 1 ? player1Name : player2Name;
            alert('Winner: ' + winner);
            resetGame();
            return;
        }
    }

    if (shadowGameBoard.every(spot => spot !== null)) {
        alert('Tie');
        resetGame();
    }
}

function theCharacters() {
    const char = currentPlayer === 1 ? 'X' : 'O';
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    return char;
}

function resetGame() {
    shadowGameBoard.fill(null);
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
        box.innerText = '';
    });
}

board.addEventListener('click', theGame);
