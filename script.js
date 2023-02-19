import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js";
import { OBJLoader } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/loaders/OBJLoader.js";



const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 1000);
camera.position.set(-15, 20, 30);
const renderer = new THREE.WebGLRenderer({ antialias: true } );
renderer.shadowMap.enabled = true;
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

const sunlight = new THREE.DirectionalLight(0x333333);
sunlight.position.y = 100;
sunlight.intensity = 1;
scene.add(sunlight);

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const filllight = new THREE.DirectionalLight(0xffffff);
filllight.position.x = 1;
filllight.position.y = -2;
scene.add(filllight);

const spotLight = new THREE.SpotLight(0xffffff);
scene.add(spotLight);
spotLight.position.set(-50, 50, 30);
spotLight.castShadow = true;
spotLight.angle = .15;
spotLight.penumbra = 0;
spotLight.intensity = 1;

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotLightHelper);

const sphereGeometry = new THREE.SphereGeometry(1, 50,50);
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: 0x0000ff,
  wireframe: true,
});

const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(0, 2.5, 0);
// scene.add(sphere);

const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshStandardMaterial({
  color: 0x0000ff,
  wireframe: false,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
// scene.add(plane);
plane.position.y = -5;
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;

function init(obj) {
  
  obj.traverse(function (child) {
    console.log(child)
    const material = new THREE.MeshStandardMaterial({
      color:"rgb(255, 255, 255)",
      wireframe: true,
      side: THREE.DoubleSide,
    });  

    const mesh = new THREE.Mesh(child.geometry, material);
    mesh.addEventListener("onClick", (event)=>{console.log(event)})
    mesh.rotation.x = -0.5 * Math.PI;
    mesh.position.y = -5;
    mesh.position.x = -29;
    mesh.position.z = -28;
    // mesh.position.set = (0,-10,0)
    // mesh.rotation.y = time / 1000,
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    scene.add(mesh);
  });
  function animate(time) {
    // mesh.rotation.y = -0.5 * Math.PI;
 
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
}


const loader = new OBJLoader();
loader.load("./assets/LinPoly.obj", (obj) => init(obj))
  



function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", handleWindowResize, false);

function animate(time) {

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

