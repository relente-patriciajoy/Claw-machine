// DOM Elements
const claw = document.querySelector('.claw');
const prizes = document.querySelectorAll('.prize');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const grabSound = document.getElementById('grabSound');
const joystick = document.querySelector('.joystick');
const joystickContainer = document.querySelector('.joystick-container');

let clawPosition = 130;
let score = 0;
let timeLeft = 60;
let gameInterval = null;
let gameOver = false;

// Joystick Movement
let dragging = false;

joystick.addEventListener('mousedown', (e) => {
  if (gameOver) return;
  dragging = true;
});

document.addEventListener('mouseup', () => {
  if (dragging) {
    dragging = false;
    joystick.style.left = '40px';
    joystick.style.top = '40px';
  }
});

document.addEventListener('mousemove', (e) => {
  if (!dragging || gameOver) return;

  const rect = joystickContainer.getBoundingClientRect();
  let x = e.clientX - rect.left - 20;
  let y = e.clientY - rect.top - 20;

  // Limit joystick movement
  const maxMove = 40;
  const distance = Math.sqrt(x * x + y * y);
  if (distance > maxMove) {
    const angle = Math.atan2(y, x);
    x = Math.cos(angle) * maxMove;
    y = Math.sin(angle) * maxMove;
  }

  joystick.style.left = 40 + x + 'px';
  joystick.style.top = 40 + y + 'px';

  // Move the claw
  if (x < -10 && clawPosition > 10) {
    clawPosition -= 4;
    claw.style.left = clawPosition + 'px';
  } else if (x > 10 && clawPosition < 250) {
    clawPosition += 4;
    claw.style.left = clawPosition + 'px';
  }
});

// Grab Prize (on click)
joystick.addEventListener('click', () => {
  if (gameOver) return;

  // Lower the claw
  claw.style.transition = 'top 2s';
  claw.style.top = '300px';

  setTimeout(() => {
    // Close the claw and play sound
    claw.classList.add('closed');
    grabSound.currentTime = 0;
    grabSound.play();

    const clawCenter = claw.offsetLeft + claw.offsetWidth / 2;

    prizes.forEach(prize => {
      const prizeCenter = prize.offsetLeft + prize.offsetWidth / 2;

      if (Math.abs(clawCenter - prizeCenter) < 25 && prize.style.bottom === '0px') {
        // Attach the prize to the claw
        prize.style.position = 'fixed';
        prize.style.left = (clawCenter - 20) + 'px';
        prize.style.top = '300px';
        prize.style.transition = 'top 2s';

        setTimeout(() => {
          prize.style.top = '80px'; // Lift prize up
        }, 100);

        score += 1;
        scoreDisplay.textContent = score;
      }
    });

    setTimeout(() => {
      claw.style.top = '0'; // Lift claw back up
    }, 500);

    setTimeout(() => {
      claw.classList.remove('closed'); // Open claw
    }, 2500);
  }, 2000);
});

// Timer
function startTimer() {
  gameInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(gameInterval);
      gameOver = true;
      showWinScreen();
    }
  }, 1000);
}