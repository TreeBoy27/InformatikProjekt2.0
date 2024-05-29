//Import Main Libary
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
//Import Control For Camera
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';
//Import File Extension Reader (.GLTF)
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';



//Create Scene
const scene = new THREE.Scene();
//Create A New Camera (+ Pos And Angles)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

//Make Variable For Accessing 3D Object
let object;

//OrbitControls To Allow Camera To Move Around Freely
let controls;

//Set Which Object To Render
let objToRender = 'camera-poly';

//Instance For GLTF Loader
const loader = new GLTFLoader();


//Loading The File
loader.load(
    `Assets/3D-Objects/${objToRender}/scene.gltf`,
    function (gltf) {
        //If the file is loaded, add it into the scene
        object = gltf.scene;
        scene.add(object);

        // Adjust camera position to zoom closer to the object


    },
    function (xhr) {
        //While it is loading, log the progress
        console.log((xhr.loaded / xhr.total * 100) +  '% loaded');
    },
    function (error) {
        //If there is an error, log it
        console.error(error);
    }
);
  

//Initialize a new renderer and set size
const renderer = new THREE.WebGLRenderer({ alpha: true }); //Alpha true -> Allows Render Background Be Transparent
renderer.setSize(window.innerWidth, window.innerHeight);

//Add the renderer to DOM
document.getElementById("container3D").appendChild(renderer.domElement);

//Set how far the camerea will be from the 3D model
camera.position.z = objToRender === "camera-poly" ? 25 : 500;

//Add Lights
const topLight = new THREE.DirectionalLight(0xffffff, 1) // (color, intensity)
topLight.position.set(500, 500, 500) //Positioning The Lightning To the Top Left
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, objToRender === "camera-poly" ? 5 : 1)
scene.add(ambientLight)



//Render the scene
function animate() {

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    //-- POSSIBLE ADDITIONAL CODE --//
    // Automatic Movement, etc.//
    console.log("Animated.")

}

//Add a listener to the window, to resize the window and the camera
window.addEventListener("resize", function() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight)

})



//Start the 3D rendering
animate();