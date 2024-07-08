/*-------------------------------- Constants --------------------------------*/
const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.getElementById('message');
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
const resetBtnEl = document.createElement('button');

/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn;
let winner;
let tie;



/*------------------------ Cached Element References ------------------------*/
resetBtnEl.id = 'reset';
resetBtnEl.textContent = 'Reset';
document.body.appendChild(resetBtnEl);
resetBtnEl.addEventListener('click', init);



/*-------------------------------- Functions --------------------------------*/
function init() {
    console.log('init function called');
    board = ['', '', '', '', '', '', '', '', ''];
    turn = 'X';
    winner = false;
    tie = false;
    render();
  }
  init();


function render() {
    updateBoard();
    updateMessage();
  }

function updateBoard() {
    board.forEach((cell, index) => {
      const square = squareEls[index];
      square.textContent = cell;
    });
  }
  
function updateMessage() {
    if (winner) {
      messageEl.textContent = `${turn} wins!`;
    } else if (tie) {
      messageEl.textContent = "It's a tie!";
    } else {
      messageEl.textContent = `It's ${turn}'s turn`;
    }
  }
function handleClick(event) {
    const squareIndex = event.target.id;
    if (board[squareIndex] || winner) return;
  
    placePiece(squareIndex);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();
  }

function placePiece(index) {
    board[index] = turn;
    console.log(board);
  }

function checkForWinner() {
    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        winner = true;
        console.log(winner);
        break;
      }
    }
  }
function switchPlayerTurn() {
    if (winner) return;
    turn = turn === 'X' ? 'O' : 'X';
    console.log(turn);
  }
function checkForTie() {
    if (winner) return;
    tie = board.every(cell => cell !== '');
    console.log(tie);
  }

/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach(square => {
    square.addEventListener('click', handleClick);
  });

  render();