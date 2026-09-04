import * as THREE from 'three';
import { BaseObject } from '../components/BaseObject';

export interface EngineConfig {
  container: HTMLElement;
  antialias?: boolean;
  clearColor?: string | number;
}

export class Engine {
  public renderer: THREE.WebGLRenderer;
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  private objects: Set<BaseObject> = new Set();
  private timer: THREE.Timer = new THREE.Timer();
  private isRunning: boolean = false;

  constructor(config: EngineConfig) {
    console.log('Initializing Three.JS...')

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      config.container.clientWidth / config.container.clientHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;

    // Ensure a canvas exists in the container or create one
    let canvas = config.container.querySelector('canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      config.container.appendChild(canvas);
    }

    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas as HTMLCanvasElement,
      antialias: config.antialias ?? true,
      alpha: true
    });
    this.renderer.setSize(config.container.clientWidth, config.container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    if (config.clearColor !== undefined) {
      this.renderer.setClearColor(config.clearColor);
    }

    window.addEventListener('resize', () => this.onResize());
  }

  public addObject(obj: any) {
    this.objects.add(obj);
  }

  public removeObject(obj: any) {
    this.objects.delete(obj);
  }

  private onResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  public start() {
    if (this.isRunning) {
      return;
    }
    this.isRunning = true;
    this.animate();
  }

  private animate() {
    if (!this.isRunning) {
      return;
    }
    requestAnimationFrame(() => this.animate());
    this.timer.update();

    const delta = this.timer.getDelta();
    for (const obj of this.objects) {
      obj.update(delta);
    }

    this.renderer.render(this.scene, this.camera);
  }
}

