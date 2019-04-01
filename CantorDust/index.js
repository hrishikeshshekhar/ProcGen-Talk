// Setting all the constants
const width = window.innerWidth;
const height = window.innerHeight;
const near = 0.1;
const far = 1000;
const view_angles = 45;
const ratio = width / height;
let N = 0;

// Setting up three js
const camera = new THREE.PerspectiveCamera(view_angles, ratio, near, far);
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

// Setting up the dom element
document.body.appendChild(renderer.domElement);

// Creating an initial cube
const side = 5;
let cubes = [new Cube(0, 0, 0, side)];

// Setting the viewing point
const viewX = 0;
const viewY = 10;
const viewZ = 10;

// Setting the camera position
camera.position.set(viewX, viewY, viewZ);
camera.lookAt(0, 0, 0);

// Adding a light source
const light = new THREE.DirectionalLight(0xFFFFFF, 1);
light.position.set(viewX, viewY, viewZ);
scene.add(light);


// Function to split cubes
function split(){
    // Storing the new cubes in another array
    let new_cubes = [];

    // Iterating through the present cubes and splitting them
    for(let i = 0; i < cubes.length; ++i){
        let cubes_new = cubes[i].split();
        for(let j = 0; j < cubes_new.length; ++j){
            new_cubes.push(cubes_new[j]);
        }
    }

    // Reassinging the cubes with the new cubes
    cubes = new_cubes;
}

// Function to initialize the cantor dust
function init(){
    // Adding all the cubes to the scene
    addScene();

    // Calling the animate function
    animate();
}

// Adding an event listener for splitting the cubes on click
document.body.addEventListener("click", splitCubes);

// Function to split cubes on click
function splitCubes(){
    // Incrementing N
    ++N;

    if(N <= 4){
        // Removing all the cubes from the scene and re-rendering the new cubes
        for(let i = 0; i < cubes.length; ++i){
            scene.remove(cubes[i].getCube());
        }

        // Splitting the cubes
        split();

        // Adding the new cubes to the scene
        addScene();
    }
}

// Function to add cubes to the scene
function addScene(){
    for(let i = 0; i < cubes.length; ++i){
        // Rotating the cubes slightly
        cubes[i].cube.rotation.y += 0.3;
        scene.add(cubes[i].getCube());
    }    
}

// Adding controls
const controls = new THREE.OrbitControls(camera);

// A function to animate
function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    // Rotating the cubes
    for(let i = 0; i < cubes.length; ++i){
        cubes[i].getCube().rotation.y += 0.01;
    }
}

// Calling the init function 
init();