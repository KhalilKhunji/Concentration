// Constants
// 1. Array of Cards
// 2. Number of Attempts
// 3. Time Durations for Each Phase (Memorization and Matching)


// Variables
// 1. Number of Cards on Display [Variable in initial according to stretch, but here according to number matched while the game is played.
// 2. Randomized Card Pairs from Array [Need Randomization function to ensure no overlapping pairs]
// 3. Cards chosen by player (Card A and Card B)
// 4. Player's Score.
// 5. Current Game Phase (Memorization or Match)
// 6. Game Outcome/State (Win or Loss)



// Cached Elements
// 1. The cards on display (For Each?), only rendered cards.
// 2. Start/Reset Button
// 3. Timer(s)
// 4. Score Update
// 5. Attempt Update
// 6. Message Box (Announces game start, matched pair outcomes, score changes, attempt changes, phase changes, time out, and game outcome).


// 3. Timer
const timerEl = document.querySelector("#timer");

// Event Listeners
// 1. The Cards on display (For Each) to be clicked.
// 2. Start/Reset Button


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
    let time = 30;
    const timer = setInterval(() => {
        time--;
        timerEl.innerHTML = time;
        if (time === 0) {
            clearInterval(timer);
        };
    }, 1000);
};
