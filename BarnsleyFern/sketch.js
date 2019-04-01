// Declaring constants
const width  = window.innerWidth * 2 / 3;
const height = window.innerHeight;
const iters =  100;

// Globally storing the current x and y
let x = 0, y = 0;

// A function to setup the canvas
function setup(){
    createCanvas(width, height);
    background(0);
}

// A function to find the next point
function findNext(){
    // Choosing a random number 
    const num = Math.random();
    let newX = 0, newY = 0;

    // Case 1
    if(num < 0.01){
        newX = 0;
        newY = 0.16 * y;
    }

    // Case 2 
    else if(num < 0.86){
        newX = 0.85  * x + 0.04 * y;
        newY = -0.04 * x + 0.85 * y + 1.6;  
    }

    // Case 3
    else if(num < 0.93){
        newX = 0.2  * x - 0.26 * y;
        newY = 0.23 * x + 0.22 * y + 1.6;
    }

    // Case 4 
    else{
        newX = -0.15 * x + 0.28 * y;
        newY = 0.26  * x + 0.24 * y + 0.44;
    }

    // Updating x and y
    x = newX;
    y = newY;
}

// A function to draw the point
function drawPoint(){
    fill(34, 220, 34);
    const pointSize = 3;
    const dx = map(x, -1 * 2.1820, 2.6558, width / 5, width * 4 / 5);
    const dy = map(y,           0, 9.9983, height, 0);
    ellipse(dx, dy, pointSize, pointSize);
}

// A function to draw the leaf
function draw(){
    for(let i = 0; i < iters; ++i){
        findNext();
        drawPoint();
    }
}
