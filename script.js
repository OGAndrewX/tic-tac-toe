const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const checkWin = () => {
  let won = false;
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      won = true;
      break;
    }
  }
  return won;
};

const checkDraw = () => {
  return gameState.every(cell => cell !== '');
};

const updateGameStatus = () => {
  if (checkWin()) {
    statusText.textContent = `${currentPlayer} 2li kesb haha kosomak 🖕`;
    gameActive = false;
  } else if (checkDraw()) {
    statusText.textContent = `It's a draw!`;
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `${currentPlayer}'s turn`;
  }
};

const handleCellClick = (e) => {
  const index = e.target.getAttribute('data-index');
  if (gameState[index] !== '' || !gameActive) return;
  
  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  updateGameStatus();
};

const restartGame = () => {
  currentPlayer = 'X';
  gameState = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  statusText.textContent = `${currentPlayer}'s turn`;

  cells.forEach(cell => (cell.textContent = ''));
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
