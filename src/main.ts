import { initScene } from './scene/main.scene';

const container = document.getElementById('app');

if (container) {
  initScene(container);
} else {
  console.error('Failed to find #app container in index.html');
}
