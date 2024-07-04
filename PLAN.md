# Browser Game Project Plan - Concentration

The project will be [Concentration](https://en.wikipedia.org/wiki/Concentration_(card_game)), a type of card-based memory game.

The Minimum Viable Product should be the standard 52-card variant (no jokers).

A set number of randomized matching pairs (cards of the same rank) would be placed on screen with a set time to memorize them; after which they are flipped and the player would have a set duration and number of attempts to match the pairs by memory, scoring a point per matched pair.

The win condition is scoring the maximum number of points - equivalent to the number of matched pairs initially set us; as a proof of concept, 5 matching pairs, with additional stretch goal to add more matching pairs for increased difficulty - modified via a scale bar or difficulty option, for example.

The lose condition is to run out of time or attempts when trying to match cards. 

There is no tie condition. The game ends when the time has elapsed or all the correct card pairs have been matched or the number of attempts have run out.

## User Stories

* As a user, I want to recognize the kind of game I'm playing when loading the webpage (brief explanation of rules and controls) and how to start it.
* As a user, it should be clear to me where the cards are on the page, how many cards I need to memorize, and how much time I have to commit them to memory.
* As a user, once the first timer has elapsed, I expect to have the cards I memorized flip over to start the next phase of the game, with a new timer started to match the now hidden pairs, and the number of attempts I have clearly displayed.
* As a user, I expect the card pairs to have retained their position, and to be able to click and start matching them, with clear feedback when the chosen pairs are correct versus when they are not.
* As a user, I should be able to tell how many points I have scored thus far (matching pairs), and how many more are needed to win.
* As a user, it should be obvious to me when I win or lose, including my loss condition (run out of time or attempts).
* As a user, I want a button that could restart the game, and for the card pairs to be randomized every time I play.


## Game Flow Pseudocode
**1. Variables:**
```
// Define a constant for: the list of cards, the number of attempts, the time durations for each phase, the number of randomized card pairs on display.
```
```
// Define a variable for: the randomized card pairs, the cards chosen by the player (card A and card B), the player's score, the game phase (memorize or match), the game outcome (win or loss). 
```
**2. Cached Elements**
```
// The cards (collective, for randomization), individual cards on display (to click on, and for flipping animation during phase change and matching), card pairs (for matching), the Start/Reset button(s).
```
**3. Event Listeners**
```
// Event listener to every card on display, and to the Start/Reset button(s).
```
**4. Invoke Init**
```
// Init function that invokes upon start button being clicked.
// Randomize the order of the cards, outputting 10 cards of 5 matching pairs (no overlap between the pairs).
// Start the memorization timer.
```
**5. Primary render function**
```
// Renders the randomized card pairs on screen. 
// Renders the timer on screen.
```
**6. Phase transition function**
```
// Upon memorization timer elapsing, starts the matching phase of the game with a new timer and a set number of attempts on display (tentatively, 6 attempts).
```
**7. Flip render function**
```
// Displays the new timer for the matching phase (visually distinct from the memorization phase?)
// Flips over the cards when the matching phase begins.
// Flips over the cards when the player clicks on them, to reveal, keeping them flipped up if the two cards clicked are matched correctly, flipping them back over if they are not.
```
**8. Updating score and attempts counter**
```
// Keeping track of both the score and attempts, ending the game if the attempts have run out, or if the score is at max (meaning all the pairs have been matched).
```
**9. Game end state**
```
// In addition to the above end game conditions (see 8.), the game should end if the timer runs out.
// Display the player's end game score, whether they won or lost, and their loss condition.
```
**10. Reinitialization function**
```
// A function prompted by a Reset button (replacing the start button) that starts a new game.
```
## Additional Features

These are beyond the Minimum Viable Product, stretch goals that would be nice to have:

* Customizable Difficulty: Adjustable scale bar that the user can interact with to change the number of randomized pairs, amount of memorization/matching time, and number of attempts.
* Alternative card art (for variety, increased memorization difficulty, aesthetics, etc.)
* Option for more than the standard 52 card deck size (such as including jokers, duplicate pairs, special rules, etc.)
