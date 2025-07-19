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
    };

    const isGameOver = () => {
        for (let i = 0; i < 9; ++i) if (board[i] == "") return false;
        return true;
    };

    return { getCurrentPlayer, playRound, getBoard, getWinner, reset, isGameOver };
})();

const displayController = (function (doc) {
    const showBoard = () => {
        for (let i = 0; i < 9; ++i) {
            const btn = doc.querySelector(`button.game-square:nth-child(${i + 1})`);
            btn.textContent = gameBoard.getBoard()[i];
        }
    };

    return { showBoard };
})(document);