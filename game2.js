// --- Game Configuration ---
const SHAPES = {
    circle: '🔴',
    square: '🟦',
    triangle: '🔺'
};
const SHAPE_NAMES = Object.keys(SHAPES);
let targetShapeName = '';
let score = 0;
const SCORE_TO_WIN = 10;
let lastShapeName = ''; // Tracks the previous shape for non-repetition

// --- DOM Elements ---
const cosmoShapeElement = document.getElementById('cosmo-shape');
const messageElement = document.getElementById('message');
const scoreElement = document.getElementById('score');
const choiceButtonsDiv = document.getElementById('choice-buttons');

// --- Helper Functions ---

/** Gets a random selection of three shape names, including the target. */
function getRandomChoices(correctShape) {
    let choices = new Set([correctShape]);
    while (choices.size < 3) {
        const randomShape = SHAPE_NAMES[Math.floor(Math.random() * SHAPE_NAMES.length)];
        choices.add(randomShape);
    }
    const choicesArray = Array.from(choices);
    choicesArray.sort(() => Math.random() - 0.5);
    return choicesArray;
}

/** Generates and sets up the buttons for the current round. (UPDATED) */
function generateButtons(choices) {
    choiceButtonsDiv.innerHTML = '';
    choices.forEach(shapeName => {
        const button = document.createElement('button');
        button.classList.add('shape-button');
        
        // NEW LOGIC: Check if the button is the triangle and apply the size boost class
        if (shapeName === 'triangle') {
            button.classList.add('triangle-boost'); 
        }
        
        button.textContent = SHAPES[shapeName];
        button.setAttribute('data-shape', shapeName);
        button.addEventListener('click', handleGuess);
        choiceButtonsDiv.appendChild(button);
    });
}

/** Handles the user clicking a button. */
function handleGuess(event) {
    document.querySelectorAll('.shape-button').forEach(btn => btn.disabled = true);

    const chosenShape = event.target.getAttribute('data-shape');

    if (chosenShape === targetShapeName) {
        score++;
        messageElement.textContent = `Excellent! You sorted the ${targetShapeName.toUpperCase()}! 🪐`;
        scoreElement.textContent = "Score: " + score;

        if (score >= SCORE_TO_WIN) {
            handleWin();
            return;
        }

        setTimeout(newRound, 1200);

    } else {
        messageElement.textContent = `Try again. Cosmo needs the ${targetShapeName.toUpperCase()} shape.`;

        // Visual feedback for wrong guess
        cosmoShapeElement.style.transform = 'rotate(-15deg)';
        setTimeout(() => {
            cosmoShapeElement.style.transform = 'rotate(0deg)';
            document.querySelectorAll('.shape-button').forEach(btn => btn.disabled = false);
        }, 800);
    }
}

/** Handles the winning condition for Game 2 and links to Game 3. */
function handleWin() {
    messageElement.textContent = "🎉 MISSION COMPLETE! Unlock Game 3: Planet Size-Up!";

    choiceButtonsDiv.innerHTML = '';
    const nextGameButton = document.createElement('button');
    nextGameButton.textContent = "Continue to Game 3 >>";
    nextGameButton.style.cssText = "padding: 15px 30px; font-size: 2em; background-color: #ff9900; color: white; border: none; border-radius: 10px; cursor: pointer; box-shadow: 0 5px 0 0 #cc7a00;";

    // This links to the next local file (which is assumed to be Game 3 in the same repo)
    nextGameButton.onclick = () => window.location.href = 'game3.html'; 

    choiceButtonsDiv.appendChild(nextGameButton);
}

/** Sets up a new round of the game. (UPDATED Randomization) */
function newRound() {
    let nextShapeName;

    // 1. Pick a new random target shape, ensuring it's not the last one
    do {
        nextShapeName = SHAPE_NAMES[Math.floor(Math.random() * SHAPE_NAMES.length)];
    } while (nextShapeName === lastShapeName);

    // 2. Update the tracking variables
    targetShapeName = nextShapeName;
    lastShapeName = nextShapeName;

    // 3. Set the visual target
    cosmoShapeElement.style.transform = 'scale(1.1)';
    setTimeout(() => cosmoShapeElement.style.transform = 'scale(1.0)', 200);

    // 4. Update the instructions
    messageElement.textContent = "Find the " + targetShapeName.toUpperCase() + "!";

    // 5. Generate the new set of choice buttons
    const choices = getRandomChoices(targetShapeName);
    generateButtons(choices);
}


// --- Start the Game! ---
setTimeout(newRound, 500);
