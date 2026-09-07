import * as THREE from 'three';
import { Cube, CubeSettings } from '@/components/Cube';
import { CubeControlPanel } from '@/ui/CubeControlPanel';
import { Engine } from '@/core/Engine';

/**
 * Initializes the main 3D scene, including the engine, lighting, cube, and control panel.
 * @param container The HTML element where the scene will be rendered.
 */
export function initScene(container: HTMLElement) {
  // 1. Initialize Engine
  const engine = new Engine({
    container,
    clearColor: '#1a1a1a'
  });

  // 2. Add Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  engine.scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 50);
  pointLight.position.set(5, 5, 5);
  engine.scene.add(pointLight);

  // 3. Add Components
  const cube1Settings: CubeSettings = {
    size: 2.0,
    color: '#00a2ff',
    position: new THREE.Vector3(-2.0, 0.0, 0.0),
    rotationSpeed: new THREE.Vector3(0.7, 0.9, 0.1),
    metalness: 0.9,
    roughness: 0.6
  };

  const cube2Settings: CubeSettings = {
    size: 1.0,
    color: '#00ff7b',
    position: new THREE.Vector3(1.0, 1.0, 1.0),
    rotationSpeed: new THREE.Vector3(1.0, 0.5, 0.3),
    metalness: 0.9,
    roughness: 0.6
  };

  const cubes: Cube[] = [];
  for (const settings of [cube1Settings, cube2Settings]) {
    const cube = new Cube(engine.scene, settings);
    engine.addObject(cube);
    cubes.push(cube);
  }

  // 4. Setup Control Panel
  const controls = new CubeControlPanel(cubes);
  controls.initialize();

  // 5. Start
  engine.start();
}
