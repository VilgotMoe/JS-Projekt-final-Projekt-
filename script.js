"use strict";

// Elementselektorer
const elementer = {
  poäng: [
    document.getElementById("score--0"),
    document.getElementById("score--1"),
  ],
  spelare: [
    document.querySelector(".player--0"),
    document.querySelector(".player--1"),
  ],
  aktuellPoäng: [
    document.getElementById("current--0"),
    document.getElementById("current--1"),
  ],
  tärningsBild: document.querySelector(".dice"),
  nyttSpel: document.querySelector(".btn--new"),
  kastaTärning: document.querySelector(".btn--roll"),
  behållTärning: document.querySelector(".btn--hold"),
};

// Spelvariabler
let poäng, aktuellPoäng, aktivSpelare, spelas;

// Funktion för att initialisera inställningar
const initiera = () => {
  poäng = [0, 0];
  aktuellPoäng = 0;
  aktivSpelare = 0;
  spelas = true;

  elementer.poäng.forEach((poäng) => (poäng.textContent = 0));
  elementer.aktuellPoäng.forEach((poäng) => (poäng.textContent = 0));

  elementer.tärningsBild.classList.add("hidden");
  elementer.spelare.forEach((spelare) => {
    spelare.classList.remove("player--winner");
    spelare.classList.remove("player--active");
  });
  elementer.spelare[aktivSpelare].classList.add("player--active");
};

initiera();

// Funktion för att byta spelare
const bytSpelare = () => {
  elementer.aktuellPoäng[aktivSpelare].textContent = 0;
  aktuellPoäng = 0;
  aktivSpelare = aktivSpelare === 0 ? 1 : 0;

  elementer.spelare.forEach((spelare) =>
    spelare.classList.toggle("player--active")
  );
};

// Händelsehanterare
elementer.kastaTärning.addEventListener("click", () => {
  if (spelas) {
    const tärning = Math.trunc(Math.random() * 6) + 1;
    elementer.tärningsBild.classList.remove("hidden");
    elementer.tärningsBild.src = `/images/dice-${tärning}.png`;

    if (tärning !== 1) {
      aktuellPoäng += tärning;
      elementer.aktuellPoäng[aktivSpelare].textContent = aktuellPoäng;
    } else {
      bytSpelare();
    }
  }
});

elementer.behållTärning.addEventListener("click", () => {
  if (spelas) {
    poäng[aktivSpelare] += aktuellPoäng;
    elementer.poäng[aktivSpelare].textContent = poäng[aktivSpelare];

    if (poäng[aktivSpelare] >= 100) {
      spelas = false;
      elementer.spelare[aktivSpelare].classList.add("player--winner");
      elementer.tärningsBild.classList.add("hidden");
    } else {
      bytSpelare();
    }
  }
});

elementer.nyttSpel.addEventListener("click", initiera);
