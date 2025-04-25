const claw = document.querySelector('.claw');
const prizes = document.querySelectorAll('.prize');
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

let clawPosition = 130;
let score = 0;
let timeLeft = 60;
let gameInterval = null;
let gameOver = false;

// Movement
leftBtn.addEventListener('click', () => {
  if (gameOver) return;
  if (clawPosition > 10) {
    clawPosition -= 30;
    claw.style.left = clawPosition + 'px';
  }
});

rightBtn.addEventListener('click', () => {
  if (gameOver) return;
  if (clawPosition < 250) {
    clawPosition += 30;
    claw.style.left = clawPosition + 'px';
  }
});

// Grab
startBtn.addEventListener('click', () => {
  if (gameOver) return;

  claw.style.top = '300px';

  setTimeout(() => {
    const clawCenter = claw.offsetLeft + 20;

    prizes.forEach(prize => {
      const prizeCenter = prize.offsetLeft + 20;

      if (Math.abs(clawCenter - prizeCenter) < 25 && prize.style.bottom === '0px') {
        prize.style.bottom = '100px';
        score += 1;
        scoreDisplay.textContent = score;
      }
    });

    claw.style.top = '0';
  }, 1000);
});

// Timer
function startTimer() {
  gameInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(gameInterval);
      gameOver = true;
      alert(`⏰ Time's up! Your score: ${score}`);
    }
  }, 1000);
}

// Reset
resetBtn.addEventListener('click', () => {
  score = 0;
  timeLeft = 60;
  clawPosition = 130;
  claw.style.left = clawPosition + 'px';
  claw.style.top = '0px';
  scoreDisplay.textContent = score;
  timerDisplay.textContent = timeLeft;
  gameOver = false;

  prizes.forEach(prize => {
    prize.style.bottom = '0px';
  });

  clearInterval(gameInterval);
  startTimer();
});

// Start timer on page load
window.onload = startTimer;
