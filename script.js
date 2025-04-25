const claw = document.querySelector('.claw');
const prizes = document.querySelectorAll('.prize');
const startBtn = document.getElementById('startBtn');

startBtn.addEventListener('click', () => {
  clawDown();
});

function clawDown() {
  claw.style.top = '300px';

  setTimeout(() => {
    // Check for prize under claw
    const clawX = claw.offsetLeft + 20;

    prizes.forEach(prize => {
      const prizeX = prize.offsetLeft + 20;
      if (Math.abs(clawX - prizeX) < 25) {
        prize.style.bottom = '100px';
        prize.style.transition = 'bottom 1s';
      }
    });

    claw.style.top = '0';
  }, 1000);
}