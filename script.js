import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js";
import { OBJLoader } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/loaders/OBJLoader.js";

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(12000, w / h, 0.01, 1000000);
camera.position.set(-841.1214360407214, 954.750567416804, 1457.2791386517558);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.shadowMap.enabled = true;
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(w, h);
renderer.setClearColor('lightblue');

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

const sunlight = new THREE.DirectionalLight(0x333333);
sunlight.position.y = 20000;
sunlight.intensity = 6.5;
sunlight.castShadow = true;
scene.add(sunlight);

const ambientLight = new THREE.AmbientLight(0x333333);
ambientLight.intensity = 2.5;
scene.add(ambientLight); 

const filllight = new THREE.DirectionalLight(0xffffff);
filllight.position.x = 1;
filllight.position.y = 0;
scene.add(filllight);

const spotLight = new THREE.SpotLight("white");
spotLight.position.set(-700, -180, 700);
spotLight.castShadow = true;
spotLight.angle = .2;
spotLight.penumbra = 1;
spotLight.intensity = .9;
// scene.add(spotLight);

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotLightHelper);


const planeGeometry = new THREE.PlaneGeometry(5000, 5000);
const planeMaterial = new THREE.MeshStandardMaterial({
  color: 0x0000ff,
  wireframe: false,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.y = -220;
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;
// scene.add(plane);


function init(obj) {
  obj.traverse(function (child) {
   
    const material = new THREE.MeshStandardMaterial({
      color: "white",
      // emmisive: "000000",
      // specular: "111111",
      transparent: true,
      opacity: .08,
      wireframe: true,
      // side: THREE.DoubleSide,
    });  
    
    const mesh = new THREE.Mesh(child.geometry, material);
    mesh.position.y = -200;
    mesh.rotation.x = -0.5 * Math.PI;
    // mesh.receiveShadow = true;
    // mesh.castShadow = true;
    // mesh.rotation.set(Math.PI/2,0,0)
    scene.add(mesh);

    function animate(time) {
        
      // mesh.rotation.z += .001 ;
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();
  });
}
const slider = document.getElementById("exterior")
slider.onchange = function (e) {
  console.log(e.target.value)
  left = -(e.target.value);
  right = e.target.value;
}
const height = document.getElementById("floor")
height.onchange = function (e) {
  console.log(e.target.value)
  forward = e.target.value
  backward = -(e.target.value)
  // left = -(e.target.value)
  // right = e.target.value
}
const explode = document.getElementById("explode")
explode.addEventListener("click", function () {
  left = - 1250;
  right = 1250
  forward = 300;
  backward = -300
  height.value = 300
  slider.value = 1250
})
const closer = document.getElementById("return")
closer.addEventListener("click", function () {
  left = 0;
  right = 0
  forward = 0;
  backward = 0
  height.value = 0
  slider.value = 0
})

let forward = 0;
let backward = 0;

let left = 0;
let right = 0;
function singleLoad(geometry, color, instance) { 

  const material = new THREE.MeshLambertMaterial({
    color: (color),
    side: THREE.DoubleSide,
  })
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.y = -200;
  mesh.rotation.x = -0.5 * Math.PI;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
}
function atriumLoad(geometry, color, instance) { 

  const material = new THREE.MeshLambertMaterial({
    color: (color),
    side: THREE.DoubleSide,
    transparent: true,
    opacity: .55,
  })
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.y = -200;
  mesh.rotation.x = -0.5 * Math.PI;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
}
function floor1Load(geometry, color, instance) { 

  const material = new THREE.MeshLambertMaterial({
    color: (color),
    side: THREE.DoubleSide,
  })
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.y = -200;
  mesh.rotation.x = -0.5 * Math.PI;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);
  function animate() {
    if (mesh.position.z < forward) {
      mesh.position.z += 5
      mesh.position.x += 5
    }
    if (mesh.position.z > forward){
      mesh.position.z -= 5
      mesh.position.x -= 5
    }
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
}
function floor3Load(geometry, color, instance) { 

  const material = new THREE.MeshLambertMaterial({
    color: (color),
    side: THREE.DoubleSide,
  })
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.y = -200;
  mesh.rotation.x = -0.5 * Math.PI;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);
  function animate() {
    if (mesh.position.z < forward) {
      mesh.position.z += 5
      mesh.position.x += 10
    }
    if (mesh.position.z > forward){
      mesh.position.z -= 5
      mesh.position.x -= 10
    }
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
}
function floor2Load(geometry, color, instance) { 

  const material = new THREE.MeshLambertMaterial({
    color: (color),
    side: THREE.DoubleSide,
  })
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.y = -200;
  mesh.rotation.x = -0.5 * Math.PI;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);
 
  function animate() {
    if (mesh.position.z > backward) {
      mesh.position.z -= 5
      mesh.position.x -= 5
    }
    if (mesh.position.z < backward){
      mesh.position.z += 5
      mesh.position.x += 5
    }
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
}
function floor4Load(geometry, color, instance) { 

  const material = new THREE.MeshLambertMaterial({
    color: (color),
    side: THREE.DoubleSide,
  })
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.y = -200;
  mesh.rotation.x = -0.5 * Math.PI;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);
 
  function animate() {
    if (mesh.position.z > backward) {
      mesh.position.z -= 5
      mesh.position.x -=10
    }
    if (mesh.position.z < backward){
      mesh.position.z += 5
      mesh.position.x +=10
    }
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
}

function leftLoad(geometry, color) { 

  const material = new THREE.MeshLambertMaterial({
    color: (color),
    wireframe: false,
    side: THREE.DoubleSide,
  })
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.y = -200;
  mesh.rotation.x = -0.5 * Math.PI;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);
  function animate() {
    if (mesh.position.x > left) {
      mesh.position.x -= 20
    }
    if (mesh.position.x < left){
      mesh.position.x += 20
    }
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
}
function rightLoad(geometry, color) { 
  
  const material = new THREE.MeshLambertMaterial({
    color: (color),
    side: THREE.DoubleSide,
  })
  const mesh = new THREE.Mesh(geometry, material);
  mesh.flatShading = true,
  mesh.position.y = -200;
  mesh.rotation.x = -0.5 * Math.PI;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);
  function animate() {

    if (mesh.position.x < right) {
      mesh.position.x += 20
    }
    if (mesh.position.x > right){
      mesh.position.x -= 20
    }
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
}
const sphereGeometry = new THREE.SphereGeometry(1000,50,50);
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: "grey",
  wireframe: true,
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.castShadow = true;
sphere.receiveShadow = true;
// scene.add(sphere);

function exterior (geometry) { 
  const material = new THREE.MeshMatcapMaterial({
    side: THREE.DoubleSide,
    transparent: true,
    opacity: .55,
    matcap: new THREE.TextureLoader().load('./assets/matcap-textures/matcap-crystal.png')
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.flatShading = true,
  mesh.rotation.x = -0.5 * Math.PI;
  mesh.position.y = -200;
  scene.add(mesh);

 
  function animate() {
      // console.log(camera.position)
    // mesh.rotation.z += .001 ;
    if (mesh.position.x > left) {
      mesh.position.x -= 20
    }
    if (mesh.position.x < left){
      mesh.position.x += 20
    }
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
}

let baseGeometry;
const loader = new OBJLoader();
loader.load("./assets/Cube.obj", (obj) => init(obj))
loader.load("./assets/environment.obj", (obj) => singleLoad(obj.children[0].geometry, "rgb(2, 48, 32)"))
loader.load("./assets/environment.obj", (obj) => singleLoad(obj.children[2].geometry, "grey"))
loader.load("./assets/environment.obj", (obj) => singleLoad(obj.children[1].geometry,"silver"))
// loader.load("./assets/environment.obj", (obj) => singleLoad(obj.children[3].geometry,"black"))


//right Exterior
loader.load("./assets/Cube.obj", (obj) => rightLoad(obj.children[0].geometry, "white", "rightFascade"));

//left Exterior
loader.load("./assets/Cube.obj", (obj) => leftLoad(obj.children[8].geometry,"white", "leftFascade"));
loader.load("./assets/Cube.obj", (obj) => leftLoad(obj.children[6].geometry,"glassFrame"));
loader.load("./assets/Cube.obj", (obj) => leftLoad(obj.children[7].geometry, "white", "glassFrame"));
loader.load("./assets/Cube.obj", (obj) => exterior(obj.children[10].geometry, "white", "leftGlass"));
loader.load("./assets/Cube.obj", (obj) => exterior(obj.children[11].geometry, "white", "leftGlass"));

//Center Glass
loader.load("./assets/Cube.obj", (obj) => atriumLoad(obj.children[1].geometry, "white", "atriumGlass"));

//Individual Floors
loader.load("./assets/Cube.obj", (obj) => floor1Load(obj.children[2].geometry, "#ffdbfe","floor1"));
loader.load("./assets/Cube.obj", (obj) => floor2Load(obj.children[3].geometry, "#ffdbfe","floor2"));
loader.load("./assets/Cube.obj", (obj) => floor3Load(obj.children[5].geometry, "#ffdbfe","floor3"));
loader.load("./assets/Cube.obj", (obj) => floor4Load(obj.children[4].geometry, "#ffdbfe", "floor4"));

//Columns
loader.load("./assets/Cube.obj", (obj) => singleLoad(obj.children[9].geometry, 'grey', "structural"));

loader.load("./assets/Cube.obj", (obj) => singleLoad(obj.children[12].geometry, "grey", "base"));

function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", handleWindowResize, false);

function animate() {
  // console.log(camera.position)
  mesh.rotation.z += .001 ;

  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
renderer.setPixelRatio(window.devicePixelRatio)

