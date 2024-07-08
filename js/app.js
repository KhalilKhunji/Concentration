// Constants
// 1. Card Pairs
const pairs = [["dA","hA"],["sA","cA"],["dK","hK"],["sK","cK"],["dQ","hQ"],["sQ","cQ"],["dJ","hJ"],["sJ","cJ"],["d10","h10"],["s10","c10"],["d09","h09"],["s09","c09"],["d08","h08"],["s08","c08"],["d07","h07"],["s07","c07"],["d06","h06"],["s06","c06"],["d05","h05"],["s05","c05"],["d04","h04"],["s04","c04"],["d03","h03"],["s03","c03"],["d02","h02"],["s02","c02"]];
// 2. Number of Attempts
const attempts = 6; 
// 3. Time Durations for Each Phase (Memorization and Matching)
const memorization = 30;
const matching = 60;

// Variables
// 1. Number of Cards on Display [Variable in initial according to stretch, but here according to number matched while the game is played.]
let displayCards = [];
// 3. Cards chosen by player (Card A and Card B)
let cardA = '';
let cardB = '';
// 4. Player's Score.
let score = 0;
// 5. Current Game Phase (Memorization or Match)
let phase = 'memorization';
// 6. Game Outcome/State (Win or Loss)
let outcome = '';


// Cached Elements
// 1. The cards on display (For Each?), only rendered cards.
const card = document.querySelectorAll(".card");
// 2. Start/Reset Button
const button = document.querySelector("#button");
// 3. Timer(s)
const timerEl = document.querySelector("#timer");
// 4. Score Update
const scoreEl = document.querySelector("#score");
// 5. Attempt Update
const attemptEl = document.querySelector("#attempts");
// 6. Message Box (Announces game start, matched pair outcomes, score changes, attempt changes, phase changes, time out, and game outcome).
const messageEl = document.querySelector("message-box");



// Functions
// 2. Primary Render - Renders randomized cards onto display - Renders Memorization Timer - Game and Phase Start/End Messages.
const renderDisplay = (cardArray) => {
    for(let i = 0; i < 20; i++) {
    card[i].classList.add(displayCards[i]);
    };
    timerFunction();
};
// 1. Init function - Randomize Cards (no overlap) - Memorization Timer Start. [init should end with render()]
const randomizeCards = () => {
    let cards = pairs;
    cards.forEach(() => {
        let randomIdx = Math.floor(Math.random() * cards.length);
        let draw = cards.splice(randomIdx, 1);
        displayCards.push(draw[0][0],draw[0][1]);
        draw = [];
    });
    displayCards = displayCards.sort(()=> {
        return Math.random() - 0.5;
    });
};
const init = () => {
    displayCards = [];
    randomizeCards();
    renderDisplay(displayCards);
};


// 3. Phase Transition - Triggered by Memorization Timer Elapsing - Starts Matching Timer.
// 4. Flip Render - Flips over cards when Matching Phase begins - Renders Matching Timer - Reacts to Cards Clicked and Flips/Unflips.
// 5. Score/Attempt Tracking & Render - Updates Score and Attempts as game progresses.
// 6. Game State - Win or Loss [Latter, by time or attempts].
// 7. Reinitialization function - Reset Button clicked - go through Init again.

// Timer Function:
const timerFunction = () => {
    let time = memorization;
    const timer = setInterval(() => {
        time--;
        timerEl.innerHTML = `Time Remaining: ${time} seconds`;
        if (time === 0) {
            clearInterval(timer);
        };
    }, 1000);
};


// Event Listeners
// 1. The Cards on display (For Each) to be clicked.
// card.addEventListener("click",placeholder);
// 2. Start/Reset Button
button.addEventListener("click",init);