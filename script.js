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

    const getBoard = () =>
        [board[0], board[1], board[2], board[3], board[4], board[5], board[6], board[7], board[8]];

    return { getCurrentPlayer, playRound, getBoard };
})();