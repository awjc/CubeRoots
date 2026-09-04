import { GUI } from 'lil-gui';
import { Cube } from '../components/Cube';

export class ControlPanel {
  private gui: GUI;

  constructor(private cube: Cube) {
    this.gui = new GUI();
    this.setupControls();
  }

  private setupControls() {
    const settings = this.cube.getSettings();

    const folder = this.gui.addFolder('Cube Settings');

    folder.addColor(settings, 'color').name('Color').onChange((val: number) => {
      this.cube.updateAppearance({ color: val });
    });

    folder.add(settings, 'rotationSpeed', 0, 10).name('Rotation').onChange(() => {});

    // Note: The way update was implemented in Cube uses settings directly from the object for rotation
    // but for material properties we need to manually trigger updateAppearance.

    folder.add(settings, 'metalness', 0, 1).name('Metalness').onChange((val: number) => {
      this.cube.updateAppearance({ metalness: val });
    });

    folder.add(settings, 'roughness', 0, 1).name('Roughness').onChange((val: number) => {
      this.cube.updateAppearance({ roughness: val });
    });

    folder.open();
  }

  public destroy() {
    this.gui.destroy();
  }
}
