// Grouped list of categories and words for one player game
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
    "animal",
    "snake"
  ],
  [
    "animal",
    "parrot"
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
    "plant",
    "orchid"
  ],
  [
    "plant",
    "grass"
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
    "food",
    "burger"
  ],
  [
    "food",
    "lasagna"
  ],
  [
    "country",
    "japan"
  ],
  [
    "country",
    "canada"
  ],
  [
    "country",
    "brazil"
  ],
  [
    "country",
    "denmark"
  ]
]

// Array to hold category and question for two player game
const questions2 = [];

// Randomize order of questions for one player game
let randomQuestion = questions[Math.floor(Math.random() * questions.length)];

// Words to guess, split into individual letters
let letters = randomQuestion[1].toUpperCase().split([,]);

// REGEX to ensure user can only guess letters
const validGuess = /[a-zA-Z]/;

// Array to hold user guess
const userGuess = [];

// Start game
function start() {
  const onePlayer = document.querySelector('.onePlayer');
  const twoPlayers = document.querySelector('.twoPlayers');
  const guessForm = document.getElementById('guessForm');
  const questionForm = document.getElementById('questionForm');
  const gallows = document.getElementById('gallows');
  onePlayer.addEventListener('click', function () {
    this.classList.add('hidden');
    twoPlayers.classList.add('hidden');
    guessForm.classList.add('active');
    displayQuestion();
    gallows.style.top = '200px';
  })
  twoPlayers.addEventListener('click', function () {
    this.classList.add('hidden');
    onePlayer.classList.add('hidden');
    questionForm.classList.add('active2');
  })
}

// Display random category and number of letters for the word (one player game)
function displayQuestion() {
  // Individual letter slots
  const category = document.querySelector('.category');
  // Section for correct letters to appear
  const blank = document.querySelector('.blank');
  category.innerHTML = `
    <h2 aria-label="Category: ${randomQuestion[0]}, ${randomQuestion[1].length} letters">${randomQuestion[0]}</h2>
  `
  const displayedLetter = letters.map((letter) => `<span aria-hidden="true" class="correct">${letter}</span>`).join(' ');
  blank.innerHTML = displayedLetter;
}

// Display category and number of letters for the word (two player game)
function displayQuestion2() {
  // Individual letter slots
  const category = document.querySelector('.category');
  // Section for correct letters to appear
  const blank = document.querySelector('.blank');
  category.innerHTML = `
    <h2 aria-label="Category: ${questions2[0]}, ${questions2[1].length} letters">${questions2[0]}</h2>
  `
  let letters2 = questions2[1].toUpperCase().split([,]);
  const displayedLetter = letters2.map((letter) => `<span aria-hidden="true" class="correct">${letter}</span>`).join(' ');
  blank.innerHTML = displayedLetter;
}

// On form submit (question creation for 2 player game)
questionForm.addEventListener('submit', function (e) {
  const categoryInput = document.getElementById('categoryInput');
  const questionInput = document.getElementById('questionInput');
  // Prevent page reload
  e.preventDefault();
  // Push category and word to questions2 array
  questions2.push(categoryInput.value);
  questions2.push(questionInput.value);
  this.classList.remove('active2');
  displayQuestion2();
  guessForm2.classList.add('active');
  gallows.style.top = '200px';
})

// On form submit (user guess) (one player game)
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
  // Prevent page from reloading
  e.preventDefault();
  // Make sure user guesses a letter
  if ((guessValue.match(validGuess)) && (!userGuess.includes(guessValue))) {
    // Push guessed letter to array. If not a valid guess, alert.
    userGuess.push(guessValue);
    // Add a body part for each incorrect guess
    displayBodyParts();
    // Alert if guess is not valid
  } else if (!guessValue.match(validGuess)) {
    alert('please enter a valid guess')
    // Alert if letter has already been guessed
  } else if ((guessValue.match(validGuess)) && (userGuess.includes(guessValue))) {
    alert('You already guessed that letter!')
  }

  // If user guess is correct, make the letter appear in the word (one player game)
  for (let i = 0; i < letters.length; i++) {
    if (letters.includes(guessValue)) {
      if (correct[i].innerHTML === guessValue) {
        correct[i].classList.add('visible');
        correct[i].setAttribute("aria-hidden", "false");
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

  // If all letters have been guessed correctly, player wins
  if (document.querySelectorAll('.correct.visible').length === letters.length) {
    alert('you win!')
    playAgain.classList.remove('hidden');
    guessForm.classList.remove('active');
  }

  // If hangman image is completed, player loses
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

// On form submit (user guess) (two player game)
guessForm2.addEventListener('submit', function (e) {
  let letters2 = questions2[1].toUpperCase().split([,]);
  let guessValue = document.getElementById('guessInput2').value.toUpperCase();
  let correct = document.querySelectorAll('.correct');
  const wrong = document.querySelector('.wrong');
  const head = document.querySelector('.head');
  const torso = document.querySelector('.torso');
  const leftArm = document.querySelector('.leftArm');
  const rightArm = document.querySelector('.rightArm');
  const leftLeg = document.querySelector('.leftLeg');
  const rightLeg = document.querySelector('.rightLeg');
  const playAgain = document.querySelector('.playAgain');
  // Prevent page from reloading
  e.preventDefault();
  // Make sure user guesses a letter
  if ((guessValue.match(validGuess)) && (!userGuess.includes(guessValue))) {
    // Push guessed letter to array. If not a valid guess, alert.
    userGuess.push(guessValue);
    // Add a body part for each incorrect guess
    displayBodyParts();
    // Alert if guess is not valid
  } else if (!guessValue.match(validGuess)) {
    alert('please enter a valid guess')
    // Alert if letter has already been guessed
  } else if ((guessValue.match(validGuess)) && (userGuess.includes(guessValue))) {
    alert('You already guessed that letter!')
  }

  // If user guess is correct, make the letter appear in the word (one player game)
  for (let i = 0; i < letters2.length; i++) {
    if (letters2.includes(guessValue)) {
      if (correct[i].innerHTML === guessValue) {
        correct[i].classList.add('visible');
        correct[i].setAttribute("aria-hidden", "false");
      }
    } 
  }

  // Function to add body parts for incorrect guesses
  function displayBodyParts() {
    let letters2 = questions2[1].toUpperCase().split([,]);
    if (!letters2.includes(guessValue)) {
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

  // If all letters have been guessed correctly, player wins
  if (document.querySelectorAll('.correct.visible').length === letters2.length) {
    alert('you win!')
    playAgain.classList.remove('hidden');
    guessForm2.classList.remove('active');
  }

  // If hangman image has been completed, player loses
  if (!rightLeg.classList.contains('hidden')) {
    alert('You lose!')
    playAgain.classList.remove('hidden');
    guessForm2.classList.remove('active');
    // Show the correct word
    for (let i = 0; i < letters2.length; i++) {
      correct[i].classList.add('visible')
    }
  }

  // Clear the form input after submit
  guessForm2.reset();
})

// Function to refresh page when Play Again button is clicked
const playAgain = document.querySelector('.playAgain');
playAgain.addEventListener('click', function () {
  location = location;
});

// Document ready
function documentReady(func) {
  document.addEventListener('DOMContentLoaded', func);
}
documentReady(start);