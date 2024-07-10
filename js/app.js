const pairs = [["dA","hA"],["sA","cA"],["dK","hK"],["sK","cK"],["dQ","hQ"],["sQ","cQ"],["dJ","hJ"],["sJ","cJ"],["d10","h10"],["s10","c10"],["d09","h09"],["s09","c09"],["d08","h08"],["s08","c08"],["d07","h07"],["s07","c07"],["d06","h06"],["s06","c06"],["d05","h05"],["s05","c05"],["d04","h04"],["s04","c04"],["d03","h03"],["s03","c03"],["d02","h02"],["s02","c02"]];
const memorization = 10;
const matching = 30;

let displayCards = [];
let match = 0;
let cardA = [];
let cardB = [];
let score = 0;
let attempts = 6; 
let state = false;

const card = document.querySelectorAll(".card");
const button = document.querySelector("#button");
const timerEl = document.querySelector("#timer");
const scoreEl = document.querySelector("#score");
const attemptEl = document.querySelector("#attempts");
const messageEl = document.querySelector("#message-box");

const init = () => {
    if(state === false) {
        state = true;
        timerEl.innerHTML = '<h2>Memorization Time Remaining: 10 seconds</h2>';
        scoreEl.innerHTML = '<p>Player Score: 0/5</p>';
        attemptEl.innerHTML = '<p>Attempts Remaining: 6/6</p>';
        score = 0;
        attempts = 6;
        button.innerText = 'Reset Game';
        displayCards = [];
        randomizeCards();
        renderDisplay(displayCards);
    };
};

const randomizeCards = () => {
    let deck = [...pairs];
    for(let i = 0; i < 10; i++) {
        let randomIdx = Math.floor(Math.random() * deck.length);
        let draw = deck.splice(randomIdx, 1);
        displayCards.push(draw[0][0],draw[0][1]);
        draw = [];
        i += 1;
    };
    displayCards = displayCards.sort(()=> {
        return Math.random() - 0.5;
    });
};

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
        if (phase === memorization) {
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
        messageEl.innerHTML = '<h2 id="mem-message">You have 10 seconds to memorize!</h2>';
    } else if (phase === matching) {
        messageEl.innerHTML = '<h2 id="mat-message">You have 30 seconds to match the cards!</h2>';
    };
};

const phaseTransition = () => {
    timerFunction(matching);
    renderTransition(displayCards);
    messageUpdate(matching);
};

const renderTransition = (array) => {
    for(let i = 0; i < 10; i++) {
        card[i].classList.remove(array[i]);
        card[i].classList.add('back');
    };
};

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
        messageEl.innerHTML = '<h2>Correct Match!</h2>';
        updateScore();
        cardA.pop();
        cardB.pop();
    } else {
        messageEl.innerHTML = '<h2>Wrong Match!</h2>';
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

const updateScore = () => {
    score += 1;
    scoreEl.innerHTML = `<p>Player Score: ${score}/5</p>`;
    if(score === 5) {
        return checkOutcome('win');
    };
};
const updateAttempts = () => {
    attempts -= 1;
    attemptEl.innerHTML = `<p>Attempts Remaining: ${attempts}/6</p>`;
    if(score !== 5 && attempts === 0) {
        return checkOutcome('loss');
    };
};

const checkOutcome = (outcome) => {
    if(outcome === 'win') {
        messageEl.innerHTML = '<h2>YOU WIN!</h2>';
    } else if (outcome === 'loss') {
        messageEl.innerHTML = '<h2>YOU LOSE!</h2>';
    };
    state = false;
    clearRender(displayCards);
};

const clearRender = (array) => {
    for(let i = 0; i < 10; i++) {
        card[i].classList.remove(array[i]);
        card[i].classList.remove('back');
    };
};

for (i = 0; i < card.length; i++) {
    card[i].addEventListener("click", handleClick);
};

button.addEventListener("click", init);