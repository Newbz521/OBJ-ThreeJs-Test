import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js";
import { OBJLoader } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/loaders/OBJLoader.js";

const w = window.innerWidth;
const h = window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(2970, w / h, 0.01, 1000000);
camera.position.set(-768.1718345036538, 91.39688067739326, 1386.7950702288035);
// camera.position.set(-20, 30, 50);
// Vector3 {x: -1268.1718345036538, y: 141.39688067739326, z: 1386.7950702288035}
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.shadowMap.enabled = true;
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(w, h);
// renderer.setClearColor('orange');

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

const sunlight = new THREE.DirectionalLight(0x333333);
sunlight.position.y = 20000;
sunlight.intensity = 10;
sunlight.castShadow = true;
scene.add(sunlight);

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight); 

const filllight = new THREE.DirectionalLight(0xffffff);
filllight.position.x = 1;
filllight.position.y = 0;
// scene.add(filllight);

const spotLight = new THREE.SpotLight("white");
spotLight.position.set(-300, 1000, 1200);
spotLight.castShadow = true;
spotLight.angle = .9;
spotLight.penumbra = 0;
spotLight.intensity = 1;
scene.add(spotLight);

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
   
    const material = new THREE.MeshPhongMaterial({
      color: "ffffff",
      emmisive: "000000",
      specular: "111111",
      wireframe: false,
      // side: THREE.DoubleSide,
    });  
    
    const mesh = new THREE.Mesh(child.geometry, material);
    mesh.rotation.x = -0.5 * Math.PI;
    // mesh.receiveShadow = true;
    // mesh.castShadow = true;
    // mesh.rotation.set(Math.PI/2,0,0)
    scene.add(mesh);

    function animate(time) {
        // console.log(camera.position)
      mesh.rotation.z += .001 ;
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();
  });
}
function singleLoad (geometry) { 
  const material = new THREE.MeshNormalMaterial({
    // wireframe: true,
    side: THREE.DoubleSide,
    // matcap: new THREE.TextureLoader().load('./assets/textures/matcaps/black-n-shiney.jpg')
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.y = -200;
  mesh.rotation.x = -0.5 * Math.PI;
  mesh.receiveShadow = true;
  mesh.castShadow = true;
  scene.add(mesh);

  const sunlight = new THREE.DirectionalLight(0xffffff);
  sunlight.position.y = 2;
  // scene.add(sunlight);

  const filllight = new THREE.DirectionalLight(0x88ccff);
  filllight.position.x = 1;
  filllight.position.y = -2;
  // scene.add(filllight);

  function animate() {
      // console.log(camera.position)
      mesh.rotation.z += .001 ;
      renderer.setClearColor( 0xffffff, 0);
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
}
function exterior (geometry) { 
  const material = new THREE.MeshNormalMaterial({
    wireframe: true,
    side: THREE.DoubleSide,
    // matcap: new THREE.TextureLoader().load('./assets/textures/matcaps/black-n-shiney.jpg')
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -0.5 * Math.PI;
  mesh.position.y = -200;
  scene.add(mesh);

  const sunlight = new THREE.DirectionalLight(0xffffff);
  sunlight.position.y = 2;
  // scene.add(sunlight);

  const filllight = new THREE.DirectionalLight(0x88ccff);
  filllight.position.x = 1;
  filllight.position.y = -2;
  // scene.add(filllight);

  function animate() {
      // console.log(camera.position)
      mesh.rotation.z += .001 ;
      renderer.setClearColor( 0xffffff, 0);
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
}

const loader = new OBJLoader();
// loader.load("./assets/Cube.obj", (obj) => init(obj))

// loader.load("./assets/Cube.obj", (obj) => singleLoad(obj.children[0].geometry));
// loader.load("./assets/Cube.obj", (obj) => singleLoad(obj.children[1].geometry));
//Columns
loader.load("./assets/Cube.obj", (obj) => singleLoad(obj.children[0].geometry));
loader.load("./assets/Cube.obj", (obj) => singleLoad(obj.children[1].geometry));
loader.load("./assets/Cube.obj", (obj) => singleLoad(obj.children[2].geometry));
loader.load("./assets/Cube.obj", (obj) => singleLoad(obj.children[3].geometry));
loader.load("./assets/Cube.obj", (obj) => singleLoad(obj.children[4].geometry));
loader.load("./assets/Cube.obj", (obj) => singleLoad(obj.children[5].geometry));
loader.load("./assets/Cube.obj", (obj) => singleLoad(obj.children[6].geometry));
loader.load("./assets/Cube.obj", (obj) => singleLoad(obj.children[7].geometry));
loader.load("./assets/Cube.obj", (obj) => singleLoad(obj.children[8].geometry));
loader.load("./assets/Cube.obj", (obj) => exterior(obj.children[9].geometry));
loader.load("./assets/Cube.obj", (obj) => exterior(obj.children[10].geometry));
loader.load("./assets/Cube.obj", (obj) => singleLoad(obj.children[11].geometry));
loader.load("./assets/Cube.obj", (obj) => singleLoad(obj.children[12].geometry));
// loader.load("./assets/Cube.obj", (obj) => singleLoad(obj.children[13].geometry));

// loader.load("./assets/Cube.obj", (obj) => singleLoad(obj.children[10].geometry));

function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", handleWindowResize, false);

// function animate(time) {
//   console.log(camera.position)
//   renderer.render(scene, camera);
// }
// renderer.setAnimationLoop(animate);
renderer.setPixelRatio(window.devicePixelRatio)

