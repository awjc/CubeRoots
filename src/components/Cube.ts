import * as THREE from 'three';
import { BaseObject } from './BaseObject';

export interface CubeSettings {
  color: number;
  rotationSpeed: number;
  metalness: number;
  roughness: number;
}

export class Cube extends BaseObject {
  private settings: CubeSettings;

  constructor(scene: THREE.Scene, initialSettings: CubeSettings) {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({
      color: initialSettings.color,
      metalness: initialSettings.metalness,
      roughness: initialSettings.roughness
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    
    super(mesh);
    this.settings = initialSettings;
    this.addTo(scene);
  }

  public update(delta: number, elapsed: number): void {
    this.mesh.rotation.x += delta * this.settings.rotationSpeed;
    this.mesh.rotation.y += delta * this.settings.rotationSpeed;
  }

  public updateAppearance(updates: Partial<CubeSettings>) {
    const mat = this.mesh.material as THREE.MeshStandardMaterial;
    
    if (updates.color !== undefined) mat.color.set(updates.color);
    if (updates.metalness !== undefined) mat.metalness = updates.metalness;
    if (updates.roughness !== undefined) mat.roughness = updates.roughness;
  }

  public getSettings() {
    return this.settings;
  }
}
