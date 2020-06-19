const startGame = document.querySelector('.startGame');
const body = document.querySelector('.body');
const gallows = document.querySelector('.gallows');

// Open frame with legal info when "Legal" is clicked
function start() {
  startGame.addEventListener('click', function () {
    this.classList.add('hidden');
    body.classList.add('hidden');
    gallows.classList.add('active');
  })
}

// Document ready
function documentReady(func) {
  document.addEventListener('DOMContentLoaded', func);
}
documentReady(start);