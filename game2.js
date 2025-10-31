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
let lastShapeName = ''; // <-- NEW: Tracks the previous shape

// --- DOM Elements (unchanged) ---
// ...

// --- Helper Functions (unchanged) ---
// ...

/** Sets up a new round of the game. (UPDATED) */
function newRound() {
    let nextShapeName;

    // 1. Pick a new random target shape, ensuring it's not the last one
    do {
        // Keep picking until the new shape is different from the last one
        nextShapeName = SHAPE_NAMES[Math.floor(Math.random() * SHAPE_NAMES.length)];
    } while (nextShapeName === lastShapeName);

    // 2. Update the tracking variables
    targetShapeName = nextShapeName;
    lastShapeName = nextShapeName; // <-- NEW: Store the current shape for the next round's check

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
