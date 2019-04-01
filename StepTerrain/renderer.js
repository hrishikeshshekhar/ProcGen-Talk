// Terrain Gen with the Diamond - Square Algorithm
const width = window.innerWidth * 8 / 10;
const height = window.innerHeight;
const ratio = width / height;
const view_ang = 45;
const near = 0.1;
const far = 1000;
let rotation_const = 0.01;
const init_min = 3;
const init_max = 8;
const roughness = 0.5;
const segment = 10;
const show_negatives = true;

// Variables to define the detail of the mesh
let detail = document.getElementById("detail").value;
let length = Math.pow(2, detail) + 1;
let zoom_lev =  2 * length;
let max = length - 1;
let length_temp = max;

// Constants for where the camera is
let viewX = 0 * zoom_lev;
let viewY = 1 * zoom_lev;
let viewZ = 1 * zoom_lev;

// Storing all the vertices into an array
let vertices;

// Storing the state
let isDiamond = false;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(view_ang, ratio, near, far);
camera.position.set(viewX, viewY, viewZ);
camera.lookAt(0, 0, 0);

// Creating and setting renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
// renderer.setClearColor( 0xffffff, 1);

// Adding the onclick functionality
const container = document.getElementById("main");
container.appendChild(renderer.domElement);

// Causing iterations to be performed with clicks
const number_dom = document.getElementById("detail");
number_dom.onchange = changeMesh;

// Function to change mesh based on N
function changeMesh(){
    // Resetting the mesh and the water
    scene.remove(plane);
    scene.remove(ground);

    // Creating a new plane
    const new_value = number_dom.value;
    detail = new_value;
    length = Math.pow(2, detail) + 1;
    zoom_lev = 2 * length;
    max = length - 1;
    length_temp = max;
    isDiamond = false;

    // Constants for where the camera is
    let viewX = 0 * zoom_lev;
    let viewY = 1 * zoom_lev;
    let viewZ = 1 * zoom_lev;

    // Reassinging the camera
    camera.position.set(viewX, viewY, viewZ);

    // Reinitialzing random offsets for the corner vertices
    initializeConstants();

    // Initialzing the new plane and water
    createPlane(max);
    createWater(max);

    // Updating the vertices with the new offsets
    updateVertices();
}

// Adding the change event listener
const change_button = document.getElementById("change");
change_button.addEventListener("click", PerformDiamond);

// Function to perform next step of diamond square
function PerformDiamond(){
    divide(length_temp, isDiamond);
    updateVertices();
    isDiamond = !isDiamond;
    if(!isDiamond){
        length_temp /= 2;
    }
}

// Adding lights
const light = new THREE.DirectionalLight(0xFFFFFF, 1);
light.position.set(viewX, viewY, viewZ);
scene.add(light);

// Creating a hemispherical light source
const light2 = new THREE.HemisphereLight( 0xEEEEFF, 0x777788, 1);
light.position.set(viewX, viewY, viewZ);
scene.add(light2);

// Adding user controls
const controls = new THREE.OrbitControls( camera, renderer.domElement);
