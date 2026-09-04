import * as THREE from 'three';

export abstract class BaseObject {
  constructor(public mesh: THREE.Mesh) {}

  abstract update(delta: number): void;

  public addTo(scene: THREE.Scene) {
    scene.add(this.mesh);
  }

  public removeFrom(scene: THREE.Scene) {
    scene.remove(this.mesh);
  }
}
