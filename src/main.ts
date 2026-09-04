import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';

console.log("Initializing Three.js...");

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Append the renderer's canvas to our #app container, or document.body as a fallback
const container = document.getElementById('app') || document.body;
container.appendChild(renderer.domElement);

// Stats is a component showing FPS performance, etc
const stats = new Stats();
container.appendChild(stats.dom);

// Add a geometry/material/mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshNormalMaterial(); // Using NormalMaterial for instant color
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);

  stats.update();
}

// Handle window resize
window.addEventListener('resize', () => {
  console.log("Resizing...");
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

animate();
console.log("Animation loop started.");
