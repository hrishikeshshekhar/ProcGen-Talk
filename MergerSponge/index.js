// Setting up the scene and camera
const view_angles = 60;
const width = window.innerWidth;
const height = window.innerHeight;
const near = 0.1;
const far  = 1000;

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(view_angles, width / height, near, far);

// Setting view position
let viewX = 0;
let viewY = 10;
let viewZ = 10;

// Setting the renderer
let renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

// Adding lights to the scene
let light = new THREE.DirectionalLight(0xff0000, 1);
light.position.set(viewX, viewY, viewZ);
scene.add(light);

// Adding controls
const orbit = new THREE.OrbitControls(camera, renderer.domElement);

// Setting the depth of the sponge
let N = 0;

// Moving the camera away
camera.position.set(viewX, viewY, viewZ);
camera.lookAt(0, 0, 0);

let cubes = [];
cubes.push(new Box(0, 0, 0, 5));

// Function to iteratively split cubes into smaller cubes
function split(){
    if(N > 3){
        return;
    }
    let next_cubes = [];
    for(let j = 0; j < cubes.length; ++j){
        let cube = cubes[j];
        let new_cubes = cube.split();
        for(let k = 0; k < new_cubes.length; ++k){
            next_cubes.push(new_cubes[k]);
        }
    }
    cubes = next_cubes;
}

// Adding an event listener for clicking and dividing
document.body.addEventListener("click", splitCubes);

// Function to split cubes
function splitCubes(){
    // Incrementing N
    N++;

    // Removing the old cubes
    removeScene();

    // Splitting the cubes
    split();

    // Adding the new cubes to the scene
    addScene();
}

// Function to add all existing cubes to the scene
function addScene(){
    // Adding all the cubes to the scene
    for(let i = 0; i < cubes.length; ++i){
        scene.add(cubes[i].getCube());
    }
}

// Function to remove all existing cubes from the scene
function removeScene(){
    for(let i = 0; i < cubes.length; ++i){
        scene.remove(cubes[i].getCube());
    }
}

// A function to initialize the sponge
function init(){
    // Adding all the cubes to the scene
    addScene();

    // Animating the cubes
    animate();
}

function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    
    // Rotating all the cubes
    for(let i = 0; i < cubes.length; ++i){
        let cube = cubes[i];
        cube.rotate();
    }
}

// Calling the init function
init();
