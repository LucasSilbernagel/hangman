const startGame = document.querySelector('.startGame');

const body = document.querySelector('.body');

const gallows = document.querySelector('.gallows');

const category = document.querySelector('.category');

const blank = document.querySelector('.blank');

const questions = [
  [
    "animal",
    "cat"
  ],
  [
    "occupation",
    "teacher"
  ],
  [
    "food",
    "pizza"
  ]
]

// Open frame with legal info when "Legal" is clicked
function start() {
  startGame.addEventListener('click', function () {
    this.classList.add('hidden');
    body.classList.add('hidden');
    gallows.classList.add('active');
    displayQuestion();
  })
}

function displayQuestion() {
  category.innerHTML = `
    <h2>${questions[0][0]}</h2>
  `
  blank.innerHTML = `
    <h2>${questions[0][1]}</h2>
  `
}

// Document ready
function documentReady(func) {
  document.addEventListener('DOMContentLoaded', func);
}
documentReady(start);