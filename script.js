// Namespace
const hangman = {}

// Grouped list of categories and words for one player game
hangman.questions = [
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
hangman.questions2 = [];

// Randomize order of questions for one player game
hangman.randomQuestion = hangman.questions[Math.floor(Math.random() * hangman.questions.length)];

// Words to guess, split into individual letters
hangman.letters = hangman.randomQuestion[1].toUpperCase().split([,]);

// REGEX to ensure user can only guess letters
hangman.validGuess = /[a-zA-Z]/;

// Array to hold user guess
hangman.userGuess = [];

// Modal to display alerts
hangman.alertModal = document.getElementById('alertModal');
// Modal background
hangman.alertModalBackground = document.getElementById('alertModalBackground');
// Alert tex displayed here
hangman.alertModalText = document.getElementById('alertModalText');
// Button to close modal
hangman.ok = document.getElementById('ok');
// Function to show modal
hangman.showModal = function () {
  alertModal.classList.toggle('visible2');
  alertModalBackground.classList.toggle('visible2');
  // Remove background elements from tab index when modal is open
  document.querySelectorAll('form, input, a, button').forEach(element => element.setAttribute("tabindex", "-1"));
  // Trap screen reader focus in modal when open
  document.querySelectorAll('header, main, footer').forEach(element => element.setAttribute("aria-hidden", "true"));
  // Allow users to click ok button
  ok.setAttribute("tabindex", "0");
  // Focus on ok button when modal opens
  ok.focus();
  // Close modal if user presses escape key
  hangman.escapeModal();
}
// Function to close modal
hangman.closeModal = function () {
  alertModal.classList.toggle('visible2');
  alertModalBackground.classList.toggle('visible2');
  document.querySelectorAll('form, input, a, button').forEach(element => element.setAttribute("tabindex", "0"));
  document.querySelectorAll('header, main, footer').forEach(element => element.setAttribute("aria-hidden", "false"));
}
// Close modal when button is clicked
hangman.ok.addEventListener('click', function () {
  hangman.closeModal();
})
// Close modal when background is clicked
hangman.alertModalBackground.addEventListener('click', function () {
  hangman.closeModal();
})
// Close modal when escape key is pressed
hangman.escapeModal = function () {
  document.addEventListener('keydown', function (event) {
    if (event.keyCode == 27) { 
      hangman.closeModal();
    }
  })
}

// Start game
hangman.start = function () {
  const onePlayer = document.querySelector('.onePlayer');
  const twoPlayers = document.querySelector('.twoPlayers');
  const guessForm = document.getElementById('guessForm');
  const questionForm = document.getElementById('questionForm');
  const gallows = document.getElementById('gallows');
  onePlayer.addEventListener('click', function () {
    this.classList.add('hidden');
    twoPlayers.classList.add('hidden');
    guessForm.classList.add('active');
    hangman.displayQuestion();
    gallows.style.top = '200px';
  })
  twoPlayers.addEventListener('click', function () {
    this.classList.add('hidden');
    onePlayer.classList.add('hidden');
    questionForm.classList.add('active2');
  })
}

// Display random category and number of letters for the word (one player game)
hangman.displayQuestion = function () {
  // Individual letter slots
  const category = document.querySelector('.category');
  // Section for correct letters to appear
  const blank = document.querySelector('.blank');
  category.innerHTML = `
    <h2 aria-label="Category: ${hangman.randomQuestion[0]}, ${hangman.randomQuestion[1].length} letters">${hangman.randomQuestion[0]}</h2>
  `
  const displayedLetter = hangman.letters.map((letter) => `<span aria-hidden="true" class="correct">${letter}</span>`).join(' ');
  blank.innerHTML = displayedLetter;
}

// Display category and number of letters for the word (two player game)
hangman.displayQuestion2 = function () {
  // Individual letter slots
  const category = document.querySelector('.category');
  // Section for correct letters to appear
  const blank = document.querySelector('.blank');
  category.innerHTML = `
    <h2 aria-label="Category: ${hangman.questions2[0]}, ${hangman.questions2[1].length} letters">${hangman.questions2[0]}</h2>
  `
  let letters2 = hangman.questions2[1].toUpperCase().split([,]);
  const displayedLetter = letters2.map((letter) => `<span aria-hidden="true" class="correct">${letter}</span>`).join(' ');
  blank.innerHTML = displayedLetter;
}

// On form submit (question creation for 2 player game)
hangman.questionFormFunction = function () {
  questionForm.addEventListener('submit', function (e) {
    const categoryInput = document.getElementById('categoryInput');
    const questionInput = document.getElementById('questionInput');
    // Prevent page reload
    e.preventDefault();
    // Push category and word to questions2 array
    hangman.questions2.push(categoryInput.value);
    hangman.questions2.push(questionInput.value);
    this.classList.remove('active2');
    hangman.displayQuestion2();
    guessForm2.classList.add('active');
    gallows.style.top = '200px';
  })
}

hangman.guessFormFunction = function () {
  // On form submit (user guess) (one player game)
  guessForm.addEventListener('submit', function (e) {
    let guessValue = document.getElementById('guessInput').value.toUpperCase();
    let correct = document.querySelectorAll('.correct');
    const wrong = document.querySelector('.wrong');
    let numberWrong = wrong.getElementsByTagName('P');
    const head = document.querySelector('.head');
    const torso = document.querySelector('.torso');
    const leftArm = document.querySelector('.leftArm');
    const rightArm = document.querySelector('.rightArm');
    const leftLeg = document.querySelector('.leftLeg');
    const rightLeg = document.querySelector('.rightLeg');
    // Prevent page from reloading
    e.preventDefault();
    // Make sure user guesses a letter
    if ((guessValue.match(hangman.validGuess)) && (!hangman.userGuess.includes(guessValue))) {
      // Push guessed letter to array. If not a valid guess, alert.
      hangman.userGuess.push(guessValue);
      // Add a body part for each incorrect guess
      displayBodyParts();
      // Alert if guess is not valid
    } else if (!guessValue.match(hangman.validGuess)) {
      alertModalText.innerHTML = "<h3>Please enter a valid guess!</h3>"
      hangman.showModal();

      // Alert if letter has already been guessed
    } else if ((guessValue.match(hangman.validGuess)) && (hangman.userGuess.includes(guessValue))) {
      alertModalText.innerHTML = "<h3>You already guessed that letter!</h3>"
      hangman.showModal();
    }

    // If user guess is correct, make the letter appear in the word (one player game)
    for (let i = 0; i < hangman.letters.length; i++) {
      if (hangman.letters.includes(guessValue)) {
        if (correct[i].innerHTML === guessValue) {
          correct[i].classList.add('visible');
          correct[i].setAttribute("aria-hidden", "false");
        }
      }
    }

    // Function to add body parts for incorrect guesses
    function displayBodyParts() {
      if (!hangman.letters.includes(guessValue)) {
        wrong.innerHTML += `<p>${guessValue}</p>`;
        if (numberWrong.length === 1) {
          head.classList.remove('hidden')
        }
        if (numberWrong.length === 2) {
          torso.classList.remove('hidden')
        }
        if (numberWrong.length === 3) {
          leftArm.classList.remove('hidden')
        }
        if (numberWrong.length === 4) {
          rightArm.classList.remove('hidden')
        }
        if (numberWrong.length === 5) {
          leftLeg.classList.remove('hidden')
        }
        if (numberWrong.length === 6) {
          rightLeg.classList.remove('hidden')
        }
      }
    }

    // If all letters have been guessed correctly, player wins
    if (document.querySelectorAll('.correct.visible').length === hangman.letters.length) {
      alertModalText.innerHTML = "<h3>You win!</h3>"
      hangman.showModal();
      hangman.playAgain.classList.remove('hidden');
      guessForm.classList.remove('active');
    }

    // If player guesses 6 wrong letters, player loses
    if (numberWrong.length === 6) {
      alertModalText.innerHTML = "<h3>You lose!</h3>"
      hangman.showModal();
      hangman.playAgain.classList.remove('hidden');
      guessForm.classList.remove('active');
      // Show the correct word
      for (let i = 0; i < hangman.letters.length; i++) {
        correct[i].classList.add('visible')
      }
    }

    // Clear the form input after submit
    guessForm.reset();
  })
}

// On form submit (user guess) (two player game)
hangman.guessForm2Function = function () {
  guessForm2.addEventListener('submit', function (e) {
    let letters2 = hangman.questions2[1].toUpperCase().split([,]);
    let guessValue = document.getElementById('guessInput2').value.toUpperCase();
    let correct = document.querySelectorAll('.correct');
    const wrong = document.querySelector('.wrong');
    let numberWrong = wrong.getElementsByTagName('P');
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
    if ((guessValue.match(hangman.validGuess)) && (!hangman.userGuess.includes(guessValue))) {
      // Push guessed letter to array. If not a valid guess, alert.
      hangman.userGuess.push(guessValue);
      // Add a body part for each incorrect guess
      displayBodyParts();
      // Alert if guess is not valid
    } else if (!guessValue.match(hangman.validGuess)) {
      alertModalText.innerHTML = "<h3>Please enter a valid guess!</h3>"
      hangman.showModal();
      // Alert if letter has already been guessed
    } else if ((guessValue.match(hangman.validGuess)) && (hangman.userGuess.includes(guessValue))) {
      alertModalText.innerHTML = "<h3>You already guessed that letter!</h3>"
      hangman.showModal();
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
      let letters2 = hangman.questions2[1].toUpperCase().split([,]);
      if (!letters2.includes(guessValue)) {
        wrong.innerHTML += `<p>${guessValue}</p>`;
        if (numberWrong.length === 1) {
          head.classList.remove('hidden')
        }
        if (numberWrong.length === 2) {
          torso.classList.remove('hidden')
        }
        if (numberWrong.length === 3) {
          leftArm.classList.remove('hidden')
        }
        if (numberWrong.length === 4) {
          rightArm.classList.remove('hidden')
        }
        if (numberWrong.length === 5) {
          leftLeg.classList.remove('hidden')
        }
        if (numberWrong.length === 6) {
          rightLeg.classList.remove('hidden')
        }
      }
    }

    // If all letters have been guessed correctly, player wins
    if (document.querySelectorAll('.correct.visible').length === letters2.length) {
      alertModalText.innerHTML = "<h3>You win!</h3>"
      hangman.showModal();
      playAgain.classList.remove('hidden');
      guessForm2.classList.remove('active');
    }

    // If hangman image has been completed, player loses
    if (!rightLeg.classList.contains('hidden')) {
      alertModalText.innerHTML = "<h3>You lose!</h3>"
      hangman.showModal();
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
}

// Function to refresh page when Play Again button is clicked
hangman.playAgain = document.querySelector('.playAgain');
hangman.playAgain.addEventListener('click', function () {
  location.reload();
});

// Initialize app
hangman.init = function () {
  hangman.start();
  hangman.questionFormFunction();
  hangman.guessFormFunction();
  hangman.guessForm2Function();
}

// Document ready
document.addEventListener('DOMContentLoaded', hangman.init);