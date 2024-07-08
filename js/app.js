// Constants
// 1. Array of Cards
const cards = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"];
// 2. Number of Attempts
const attempts = 6;
// 3. Time Durations for Each Phase (Memorization and Matching)
const memorization = 30;
const matching = 60;

// Variables
// 1. Number of Cards on Display [Variable in initial according to stretch, but here according to number matched while the game is played.]
let displayCards = 10;
// 2. Randomized Card Pairs from Array [Need Randomization function to ensure no overlapping pairs]
let cardPairs;
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
// 1. Init function - Start Button clicked - Randomize Cards (no overlap) - Memorization Timer Start. [init should end with render()]
// 2. Primary Render - Renders randomized cards onto display - Renders Memorization Timer - Game and Phase Start/End Messages.
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
        timerEl.innerHTML = time;
        if (time === 0) {
            clearInterval(timer);
        };
    }, 1000);
};


// Event Listeners
// 1. The Cards on display (For Each) to be clicked.
card.addEventListener("click",placeholder);
// 2. Start/Reset Button
button.addEventListener("click",init);