import * as THREE from 'three';

console.log("Initializing Three.js...");

// Get the app container
const container = document.getElementById('app');

if (!container) {
  console.error("Error: #app container not found in DOM!");
}

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

// Append the renderer's canvas to our #app container
if (container) {
  container.appendChild(renderer.domElement);
  console.log("Renderer canvas appended to #app");
} else {
  document.body.appendChild(renderer.domElement);
  console.log("Warning: #app not found, appended to body instead");
}

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
