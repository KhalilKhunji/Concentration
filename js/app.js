// Constants
// 1. Card Pairs
const pairs = [["dA","hA"],["sA","cA"],["dK","hK"],["sK","cK"],["dQ","hQ"],["sQ","cQ"],["dJ","hJ"],["sJ","cJ"],["d10","h10"],["s10","c10"],["d09","h09"],["s09","c09"],["d08","h08"],["s08","c08"],["d07","h07"],["s07","c07"],["d06","h06"],["s06","c06"],["d05","h05"],["s05","c05"],["d04","h04"],["s04","c04"],["d03","h03"],["s03","c03"],["d02","h02"],["s02","c02"]];
// 2. Number of Attempts
// 3. Time Durations for Each Phase (Memorization and Matching) [CHANGE TO 30 AFTER TESTING]
const memorization = 5;
const matching = 60;

// Variables
// 1. Number of Cards on Display [Variable in initial according to stretch, but here according to number matched while the game is played.]
let displayCards = [];
// 2. Number of matches:
let match = 0;
// 3. Cards chosen by player (Card A and Card B)
let cardA = [];
let cardB = [];
// 4. Player's Score.
let score = 0;
// 5. Attempts Remaining:
let attempts = 6; 
// 7. Game State
let state = false;

// Cached Elements
// 1. The cards on display, only rendered cards.
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
const messageEl = document.querySelector("#message-box");



// Functions

// 1. Init function - Randomize Cards (no overlap) - Memorization Timer Start. [init should end with render()]
const init = () => {
    if(state === false) {
        state = true;
        button.innerText = 'Reset Game';
        displayCards = [];
        score = 0;
        attempts = 6;
        randomizeCards();
        renderDisplay(displayCards);
    } else if (state === true) {
        timerFunction('end');
        state = false;
        clearRender(displayCards);
        displayCards = [];
        score = 0;
        attempts = 6;
        randomizeCards();
        renderDisplay(displayCards);
    };
};
const randomizeCards = () => {
    let cards = [...pairs];
    for(let i = 0; i < 10; i++) {
        let randomIdx = Math.floor(Math.random() * cards.length);
        let draw = cards.splice(randomIdx, 1);
        displayCards.push(draw[0][0],draw[0][1]);
        draw = [];
        i += 1;
    };
    displayCards = displayCards.sort(()=> {
        return Math.random() - 0.5;
    });
    cards = [];
};
// 2. Primary Render - Renders randomized cards onto display - Renders Memorization Timer - Game and Phase Start/End Messages.
const renderDisplay = (array) => {
    for(let i = 0; i < 10; i++) {
    card[i].classList.add(array[i]);
    };
    timerFunction(memorization);
    messageUpdate(memorization);
};
const timerFunction = (phase) => {
    let time = phase;
    const timer = setInterval(() => {
        time--;
        if (phase === 'end') {
            clearInterval(timer);
            timerEl.innerHTML = `<h2>Memorization Time Remaining: 30 seconds</h2>`;
            scoreEl.innerHTML = '';
            scoreEl.innerHTML = '<p>Player Score: 0/5</p>';
            attemptEl.innerHTML = '';
            attemptEl.innerHTML = '<p>Attempts Remaining: 6/6</p>';
        } else if (phase === memorization) {
            timerEl.innerHTML = `<h2>Memorization Time Remaining: ${time} seconds</h2>`;
            if (time === 0) {
                phaseTransition();
                clearInterval(timer);
            } else if (state === false) {
                clearInterval(timer);
            };
        } else if (phase === matching) {
            timerEl.innerHTML = `<h2>Matching Time Remaining: ${time} seconds</h2>`;
            if (time === 0) {
                checkOutcome('loss');
                clearInterval(timer);
            } else if (state === false) {
                clearInterval(timer);
            };
        };
    }, 1000);
};
const messageUpdate = (phase) => {
    if(phase === memorization) {
    messageEl.innerHTML = '';
    messageEl.innerHTML += '<h2 id="mem-message">You have 30 seconds to memorize!</h2>';
    } else if (phase === matching) {
    messageEl.innerHTML = '';
    messageEl.innerHTML += '<h2 id="mat-message">You have 60 seconds to match the cards!</h2>';
    };
};
// 3. Phase Transition - Triggered by Memorization Timer Elapsing - Starts Matching Timer.
const phaseTransition = () => {
    timerFunction(matching);
    renderTransition(displayCards);
    messageUpdate(matching);
};
// 4. Flip Render - Flips over cards when Matching Phase begins - Renders Matching Timer - Reacts to Cards Clicked and Flips/Unflips.
const renderTransition = (array) => {
    for(let i = 0; i < 10; i++) {
        card[i].classList.remove(array[i]);
        card[i].classList.add('back');
    };
};
// 5. Handle Click - Reacts to Cards Clicked and Flips/Unflips; rendering them.
const handleClick = (event) => {
    if (state === true) {
        if(event.target.classList.contains('back')) {
            if (cardA.length === 0) {
                cardA.push(event.target);
                renderFlip(cardA[0]);
            } else if (cardB.length === 0) {
                cardB.push(event.target);
                renderFlip(cardB[0]);
                setTimeout(() => {
                    matchCheck(cardA[0].id,cardB[0].id);
                },500);
            };
        };
    };
};

const matchCheck = (first,second) => {
    match = 0;
    pairs.forEach((pair) => {
        if(pair.includes(displayCards[first],displayCards[second])||pair.includes(displayCards[second],displayCards[first])){
            match += 1;
        };
    });
    if(match === 1) {
        updateScore();
        cardA.pop();
        cardB.pop();
    } else {
        messageEl.innerHTML = '';
        messageEl.innerHTML += '<h2>Wrong Match!</h2>';
        renderUnflip(cardA[0]);
        renderUnflip(cardB[0]);
        cardA.pop();
        cardB.pop();
    };
    updateAttempts();
};

const renderFlip = (slot) => {
    slot.classList.remove('back');
    slot.classList.add(displayCards[slot.id]);
};
const renderUnflip = (slot) => {
    slot.classList.remove(displayCards[slot.id]);
    slot.classList.add('back');
};

// 6. Score/Attempt Tracking & Render - Updates Score and Attempts as game progresses.
const updateScore = () => {
    score += 1;
    scoreEl.innerHTML = '';
    scoreEl.innerHTML += `<p>Player Score: ${score}/5</p>`;
    if(score === 5) {
        return checkOutcome('win');
    };
};
const updateAttempts = () => {
    attempts -= 1;
    attemptEl.innerHTML = '';
    attemptEl.innerHTML = `<p>Attempts Remaining: ${attempts}/6</p>`;
    if(score !== 5 && attempts === 0) {
        return checkOutcome('loss');
    };
};
// 7. Game State - Win or Loss [Latter, by time or attempts].
const checkOutcome = (outcome) => {
    if(outcome === 'win') {
        messageEl.innerHTML = '';
        messageEl.innerHTML += '<h1>YOU WIN!</h1>';
    } else if (outcome === 'loss') {
        messageEl.innerHTML = '';
        messageEl.innerHTML += '<h1>YOU LOSE!</h1>';
    };
    timerFunction('end');
    state = false;
    clearRender(displayCards);
};
// 8. Reinitialization function - Reset Button clicked - go through Init again.
const clearRender = (array) => {
    for(let i = 0; i < 10; i++) {
        card[i].classList.remove(array[i]);
        card[i].classList.remove('back');
    };
};


// Event Listeners
// 1. The Cards on display (For Each) to be clicked.
for (i = 0; i < card.length; i++) {
card[i].addEventListener("click", handleClick);
};
// 2. Start/Reset Button
button.addEventListener("click", init);