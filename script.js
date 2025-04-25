const claw = document.querySelector('.claw');
const prizes = document.querySelectorAll('.prize');
const startBtn = document.getElementById('startBtn');
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');
const scoreDisplay = document.getElementById('score');

let clawPosition = 130;
let score = 0;

// Move claw left
leftBtn.addEventListener('click', () => {
  if (clawPosition > 10) {
    clawPosition -= 30;
    claw.style.left = clawPosition + 'px';
  }
});

// Move claw right
rightBtn.addEventListener('click', () => {
  if (clawPosition < 250) {
    clawPosition += 30;
    claw.style.left = clawPosition + 'px';
  }
});

// Drop claw to grab
startBtn.addEventListener('click', () => {
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