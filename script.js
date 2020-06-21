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

let letters = questions[0][1].toUpperCase().split([,]);

const userGuess = [];

// Start game
function start() {
  const startGame = document.querySelector('.startGame');
  const gallows = document.querySelector('.gallows');
  const body = document.querySelector('.body');
  const guessForm = document.getElementById('guessForm');
  const guessInput = document.getElementById('guessInput');
  startGame.addEventListener('click', function () {
    this.classList.add('hidden');
    body.classList.add('hidden');
    gallows.classList.add('active');
    guessForm.classList.add('active');
    guessInput.focus();
    displayQuestion();
  })
}

function displayQuestion() {
  const category = document.querySelector('.category');
  const blank = document.querySelector('.blank');
  category.innerHTML = `
    <h2>Category: ${questions[0][0]}</h2>
  `
  const displayedLetter = letters.map((letter) => `<span class="correct">${letter}</span>`).join(' ');
  blank.innerHTML = displayedLetter;
}

guessForm.addEventListener('submit', function (e) {
  let guessValue = document.getElementById('guessInput').value.toUpperCase();
  if (guessValue === "") {
    alert('please enter a guess')
  }
  let correct = document.querySelectorAll('.correct');
  e.preventDefault();
  userGuess.push(guessValue);

  for (let i = 0; i < letters.length; i++) {
    if (letters.includes(guessValue)) {
      if (correct[i].innerHTML === guessValue) {
        correct[i].classList.add('visible')
      }
    }
  }

  
  guessForm.reset();
  console.log(userGuess);
})

// Document ready
function documentReady(func) {
  document.addEventListener('DOMContentLoaded', func);
}
documentReady(start);