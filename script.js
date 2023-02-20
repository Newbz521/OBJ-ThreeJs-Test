import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js";
import { OBJLoader } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/loaders/OBJLoader.js";

const w = window.innerWidth;
const h = window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(2970, w / h, 0.01, 1000000);
camera.position.set(-168.1718345036538, 91.39688067739326, 1700);
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
plane.position.y = -5;
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;
// scene.add(plane);

function init(obj) {
  obj.traverse(function (child) {
   
    const material = new THREE.MeshPhongMaterial({
      color: "ffffff",
      emmisive: "000000",
      specular: "111111",
      wireframe: false,
      side: THREE.DoubleSide,
    });  
    
    const mesh = new THREE.Mesh(child.geometry, material);
    mesh.position.y = -200;
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
function singleLoad (geometry, color) { 
  // const material = new THREE.MeshStandardMaterial({
  //   // wireframe: true,
  //   color: (`${color}`),
  //   side: THREE.DoubleSide,
  //   // matcap: new THREE.TextureLoader().load('./assets/textures/matcaps/black-n-shiney.jpg')
  // });

  const material = new THREE.MeshLambertMaterial({
    color: (color),
    side: THREE.DoubleSide,
})
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.y = -200;
  mesh.rotation.x = -0.5 * Math.PI;
  scene.add(mesh);
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  function animate() {
      // console.log(camera.position)
    mesh.rotation.z += .001 ;
    // renderer.setClearColor( 0xffffff, 0);
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
}

function exterior (geometry) { 
  const material = new THREE.MeshMatcapMaterial({
    side: THREE.DoubleSide,
    color: ("ffffff"),
    opacity: 1,
    normalScale: .5,
    matcap: new THREE.TextureLoader().load('./assets/matcap-textures/matcap-crystal.png')
  });
  // const material = new THREE.MeshPhysicalMaterial({
  //   color: "95c4df",
  //   reflectivity: .5,
  //   emmisive: "000000",
  //   wireframe: false,
  //   side: THREE.DoubleSide,
  // });  
  const mesh = new THREE.Mesh(geometry, material);
  // mesh.flatShading = true,
  mesh.rotation.x = -0.5 * Math.PI;
  mesh.position.y = -200;
  scene.add(mesh);


  function animate() {
      // console.log(camera.position)
    mesh.rotation.z += .001 ;
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
loader.load("./assets/Cube.obj", (obj) => singleLoad(obj.children[0].geometry, "#dedede"));
loader.load("./assets/Cube.obj", (obj) => singleLoad(obj.children[1].geometry, "#595c5a"));
loader.load("./assets/Cube.obj", (obj) => singleLoad(obj.children[2].geometry, "#ffdbfe"));
loader.load("./assets/Cube.obj", (obj) => singleLoad(obj.children[3].geometry, "#ffdbfe"));
loader.load("./assets/Cube.obj", (obj) => singleLoad(obj.children[4].geometry, "#ffdbfe"));
loader.load("./assets/Cube.obj", (obj) => singleLoad(obj.children[5].geometry,"#ffdbfe"));
loader.load("./assets/Cube.obj", (obj) => singleLoad(obj.children[6].geometry,"white"));
loader.load("./assets/Cube.obj", (obj) => singleLoad(obj.children[7].geometry,"lightblue"));
loader.load("./assets/Cube.obj", (obj) => singleLoad(obj.children[8].geometry,"lightblue"));
loader.load("./assets/Cube.obj", (obj) => exterior(obj.children[9].geometry));
loader.load("./assets/Cube.obj", (obj) => exterior(obj.children[10].geometry));
loader.load("./assets/Cube.obj", (obj) => singleLoad(obj.children[11].geometry,"white"));
loader.load("./assets/Cube.obj", (obj) => singleLoad(obj.children[12].geometry,"blue"));

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

