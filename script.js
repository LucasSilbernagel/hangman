// Grouped list of categories and words
const questions = [
  [
    "animal",
    "lizard"
  ],
  [
    "animal",
    "bobcat"
  ],
  [
    "plant",
    "cactus"
  ],
  [
    "plant",
    "shrub"
  ],
  [
    "food",
    "pizza"
  ],
  [
    "food",
    "waffle"
  ],
  [
    "country",
    "japan"
  ],
  [
    "country",
    "denmark"
  ]
]

let randomQuestion = questions[Math.floor(Math.random()*questions.length)];

// Words to guess, split into individual letters
let letters = randomQuestion[1].toUpperCase().split([,]);

// User can only guess letters
const validGuess = /[a-zA-Z]/;

const userGuess = [];

// Start game
function start() {
  const startGame = document.querySelector('.startGame');
  const guessForm = document.getElementById('guessForm');
  const guessInput = document.getElementById('guessInput');
  startGame.addEventListener('click', function () {
    this.classList.add('hidden');
    guessForm.classList.add('active');
    guessInput.focus();
    displayQuestion();
  })
}

// Display random category and number of letters for the word
function displayQuestion() {
  // Individual letter slots
  const category = document.querySelector('.category');
  // Section for correct letters to appear
  const blank = document.querySelector('.blank');
  category.innerHTML = `
    <h2>${randomQuestion[0]}</h2>
  `
  const displayedLetter = letters.map((letter) => `<span class="correct">${letter}</span>`).join(' ');
  blank.innerHTML = displayedLetter;
}

// On form submit (user guess)
guessForm.addEventListener('submit', function (e) {
  let guessValue = document.getElementById('guessInput').value.toUpperCase();
  let correct = document.querySelectorAll('.correct');
  const wrong = document.querySelector('.wrong');
  const head = document.querySelector('.head');
  const torso = document.querySelector('.torso');
  const leftArm = document.querySelector('.leftArm');
  const rightArm = document.querySelector('.rightArm');
  const leftLeg = document.querySelector('.leftLeg');
  const rightLeg = document.querySelector('.rightLeg');
  const playAgain = document.querySelector('.playAgain');
  // Function to refresh page when Play Again button is clicked
  playAgain.addEventListener('click', function () {
    location = location;
  });
  e.preventDefault();
  // Make sure user guesses a letter
  if ((guessValue.match(validGuess)) && (!userGuess.includes(guessValue))) {
    // Push guessed letter to array. If not a valid guess, alert.
    userGuess.push(guessValue);
    // Add a body part for each incorrect guess
    displayBodyParts();
  } else if (!guessValue.match(validGuess)) {
    alert('please enter a valid guess')
  } else if ((guessValue.match(validGuess)) && (userGuess.includes(guessValue))) {
    alert('You already guessed that letter!')
  }

  // If user guess is correct, make the letter appear in the word.
  for (let i = 0; i < letters.length; i++) {
    if (letters.includes(guessValue)) {
      if (correct[i].innerHTML === guessValue) {
        correct[i].classList.add('visible')
      }
    } 
  }

  // Function to add body parts for incorrect guesses
  function displayBodyParts() {
    if (!letters.includes(guessValue)) {
      wrong.innerHTML += `<p>${guessValue}</p>`;
      if (head.classList.contains('hidden')) {
        head.classList.remove('hidden')
      } else if ((!head.classList.contains('hidden')) && (torso.classList.contains('hidden'))) {
        torso.classList.remove('hidden')
      } else if ((!head.classList.contains('hidden')) && (!torso.classList.contains('hidden')) && (leftArm.classList.contains('hidden'))) {
        leftArm.classList.remove('hidden')
      } else if ((!head.classList.contains('hidden')) && (!torso.classList.contains('hidden')) && (!leftArm.classList.contains('hidden')) && (rightArm.classList.contains('hidden'))) {
        rightArm.classList.remove('hidden')
      } else if ((!head.classList.contains('hidden')) && (!torso.classList.contains('hidden')) && (!leftArm.classList.contains('hidden')) && (!rightArm.classList.contains('hidden')) && (leftLeg.classList.contains('hidden'))) {
        leftLeg.classList.remove('hidden')
      } else if ((!head.classList.contains('hidden')) && (!torso.classList.contains('hidden')) && (!leftArm.classList.contains('hidden')) && (!rightArm.classList.contains('hidden')) && (!leftLeg.classList.contains('hidden')) && (rightLeg.classList.contains('hidden'))) {
        rightLeg.classList.remove('hidden')
      }
    }
  }

  if (document.querySelectorAll('.correct.visible').length === letters.length) {
    alert('you win!')
    playAgain.classList.remove('hidden');
    guessForm.classList.remove('active');
  }

  if (!rightLeg.classList.contains('hidden')) {
    alert('You lose!')
    playAgain.classList.remove('hidden');
    guessForm.classList.remove('active');
    // Show the correct word
    for (let i = 0; i < letters.length; i++) {
      correct[i].classList.add('visible')
    }
  }

  // Clear the form input after submit
  guessForm.reset();
})

// Document ready
function documentReady(func) {
  document.addEventListener('DOMContentLoaded', func);
}
documentReady(start);