"use strict";

// Hämta dom element vi behöver för att uppdatera poäng och byta spelare
const scoreElements = [
  document.getElementById("score--0"),
  document.getElementById("score--1"),
  document.getElementById("score--2"),
];
const currentElements = [
  document.getElementById("current--0"),
  document.getElementById("current--1"),
  document.getElementById("current--2"),
];
const players = [
  document.querySelector(".player--0"),
  document.querySelector(".player--1"),
  document.querySelector(".player--2"),
];
const diceImg = document.querySelector(".dice");
const newGame = document.querySelector(".btn--new");
const rollDice = document.querySelector(".btn--roll");
const holdDice = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;

// Funktion för att initiera spelet
const init = function () {
  scores = [0, 0, 0]; // Startpoäng för varje spelare
  currentScore = 0;
  activePlayer = 0; // Spelare 1 börjar alltid
  playing = true;

  // Nollställ poäng för alla spelare
  scoreElements.forEach((scoreEl) => (scoreEl.textContent = 0));
  currentElements.forEach((currEl) => (currEl.textContent = 0));

  diceImg.classList.add("hidden");

  players.forEach((player) => {
    player.classList.remove("player--winner");
    player.classList.remove("player--active");
  });
  players[0].classList.add("player--active"); // Spelare 1 som aktiv
};
init();

// Funktion för att byta spelare
const playerSwitching = function () {
  currentElements[activePlayer].textContent = 0; // Nollställ aktuell poäng
  currentScore = 0;
  activePlayer = (activePlayer + 1) % 3; // Nästa spelare

  players.forEach((player) => player.classList.toggle("player--active", false));
  players[activePlayer].classList.add("player--active");
};

// Händelse för att rulla tärningen
rollDice.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceImg.classList.remove("hidden");
    diceImg.src = `/images/dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      currentElements[activePlayer].textContent = currentScore;
    } else {
      playerSwitching();
    }
  }
});

// Händelse för att behålla poängen
holdDice.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    scoreElements[activePlayer].textContent = scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      players[activePlayer].classList.add("player--winner");
      players[activePlayer].classList.remove("player--active");
      diceImg.classList.add("hidden");
    } else {
      playerSwitching();
    }
  }
});

// Händelse för att starta om spelet
newGame.addEventListener("click", init);
