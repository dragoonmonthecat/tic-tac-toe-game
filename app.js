const gameboard = document.querySelector('#gameboard');
const infoDisplay = document.querySelector('#turn');

const startCells = [
    "", "", "",
    "", "", "",
    "", "", ""
]

let turn = "circle";
infoDisplay.textContent = "Circle goes first";

const generateBoard = () => {
    
    startCells.forEach((_cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('square');
        cellElement.id = index;

        cellElement.addEventListener('click', toggleTurn);

        gameboard.append(cellElement);
    });
}

generateBoard();

function toggleTurn(e) {

    const turnDisplay = document.createElement('div');
    turnDisplay.classList.add(turn);

    e.target.append(turnDisplay);

    turn = turn === 'circle' ? 'cross' : 'circle';
    infoDisplay.textContent = `It's ${turn}'s turn`;
    e.target.removeEventListener('click', toggleTurn);
    
    checkScore();
}

function checkScore() {

    const allSquares = document.querySelectorAll('.square');

    const winningCombo = [
        //horizontal
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        //vertical
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        //diaginal
        [0, 4, 8], [2, 4, 6]
    ];

    winningCombo.forEach(combo => {
        const circleWins = combo.every(cell => allSquares[cell].firstChild?.classList.contains('circle'));

        if (circleWins) {
            infoDisplay.textContent = 'Circle wins';
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
            return;
        }
    
    });

    winningCombo.forEach(combo => {
        const crossWins = combo.every(cell => allSquares[cell].firstChild?.classList.contains('cross'));

        if (crossWins) {
            infoDisplay.textContent = 'Cross wins';
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
            return;
        }
    
    });
}

