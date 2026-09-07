import { Cube } from '@/components/Cube';
import { GUI } from 'lil-gui';


/**
 * A control panel for manipulating the properties of a Cube object.
 * Uses lil-gui to provide a user interface.
 */
export class CubeControlPanel {
  private gui: GUI;

  /**
   * Creates a new control panel instance.
   * @param cube The Cube object to control.
   */
  constructor(private cubes: Cube[]) {
    this.gui = new GUI();
  }

  /**
   * Initializes the GUI with controls for the cube's settings.
   */
  public initialize() {
    this.cubes.forEach((cube, idx) => {
      const settings = cube.getSettings();

      const folder = this.gui.addFolder(`Cube ${idx + 1} Settings`);

      folder.add(settings, 'size', 0.1, 5).name('Size').onChange((val: number) => {
        cube.setAppearanceVals({ size: val })
      });

      folder.addColor(settings, 'color').name('Color').onChange((val: number) => {
        cube.setAppearanceVals({ color: val });
      });


      folder.add(settings.position, 'x', -4, 4).name('Position X').onChange(() => { cube.syncPosition(); });;
      folder.add(settings.position, 'y', -4, 4).name('Position Y').onChange(() => { cube.syncPosition(); });;;
      folder.add(settings.position, 'z', -4, 4).name('Position Z').onChange(() => { cube.syncPosition(); });;;

      folder.add(settings.rotationSpeed, 'x', 0, 5).name('Rotation X');
      folder.add(settings.rotationSpeed, 'y', 0, 5).name('Rotation Y');
      folder.add(settings.rotationSpeed, 'z', 0, 5).name('Rotation Z');

      // Note: The way update was implemented in Cube uses settings directly from the object for rotation
      // but for material properties we need to manually trigger updateAppearance.

      folder.add(settings, 'metalness', 0, 1).name('Metalness').onChange((val: number) => {
        cube.setAppearanceVals({ metalness: val });
      });

      folder.add(settings, 'roughness', 0, 1).name('Roughness').onChange((val: number) => {
        cube.setAppearanceVals({ roughness: val });
      });
    });
  }

  /**
   * Destroys the GUI instance.
   */
  public destroy() {
    this.gui.destroy();
  }
}
