const gameBoard = (function () {
    const board = ["", "", "", "", "", "", "", "", ""];

    let currentPlayer = 'X';

    const switchCurrentPlayer = () => {
        currentPlayer = (currentPlayer == 'X') ? 'O' : 'X';
    };

    const getCurrentPlayer = () => currentPlayer;

    const placeMark = (i) => {
        if (board[i] == "") {
            board[i] = currentPlayer;
            return true
        }
        return false;
    };

    const playRound = (i) => {
        if (placeMark(i)) switchCurrentPlayer();
    };

    const getBoard = () => [board[0], board[1], board[2], board[3], board[4], board[5], board[6], board[7], board[8]];

    const getWinner = () => {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let i = 0; i < winningCombos.length; ++i) {
            if (board[winningCombos[i][0]] != "" && board[winningCombos[i][0]] == board[winningCombos[i][1]] &&
                board[winningCombos[i][1]] == board[winningCombos[i][2]])
                return board[winningCombos[i][0]];
        }

        return null;
    };

    const reset = () => {
        for (let i = 0; i < 9; ++i) board[i] = "";
        currentPlayer = 'X';
    };

    const isGameOver = () => {
        for (let i = 0; i < 9; ++i) if (board[i] == "") return null != getWinner();
        return true;
    };

    return { getCurrentPlayer, playRound, getBoard, getWinner, reset, isGameOver };
})();

const displayController = (function (doc) {
    const updateWinners = () => {
        doc.querySelector('.wins-one:nth-child(1) .wins-player-name').textContent = doc.querySelector('.x-name').value ? doc.querySelector('.x-name').value : 'X';
        doc.querySelector('.wins-one:nth-child(2) .wins-player-name').textContent = doc.querySelector('.o-name').value ? doc.querySelector('.o-name').value : 'O';
        const winner = gameBoard.getWinner();
        if (winner == null) return;

        const div = doc.querySelector(`.${winner.toLowerCase()}-wins`);
        div.textContent = +div.textContent + 1;
    };

    const gameSquareBtn = (i) => {
        if (gameBoard.isGameOver()) {
            resetGameBtn();
        }
        gameBoard.playRound(i);
        doc.querySelector(`button.game-square:nth-child(${i + 1})`).textContent = gameBoard.getBoard()[i];
        updateWinners();
    };

    const resetGameBtn = () => {
        gameBoard.reset();
        for (let i = 0; i < 9; ++i)
            doc.querySelector(`button.game-square:nth-child(${i + 1})`).textContent = gameBoard.getBoard()[i];
    };

    const resetWinsBtn = () => {
        doc.querySelector('.x-wins').textContent = doc.querySelector('.o-wins').textContent = 0;
    };

    const resetAllBtn = () => {
        resetGameBtn();
        resetWinsBtn();
    }

    return { gameSquareBtn, resetGameBtn, resetWinsBtn, resetAllBtn };
})(document);

for (let i = 0; i < 9; ++i)
    document.querySelector(`button.game-square:nth-child(${i + 1})`).addEventListener("click", () => {
        displayController.gameSquareBtn(i);
    });

document.querySelector("button.reset-game").addEventListener("click", displayController.resetGameBtn);

document.querySelector("button.reset-wins").addEventListener("click", displayController.resetWinsBtn);

document.querySelector("button.reset-all").addEventListener("click", displayController.resetAllBtn);
