import { PerspectiveCamera, WebGLRenderer } from 'three';
import { size } from 'pulsar-pathfinding';

class Resize {
  private size: size;
  private readonly callback: any;

  constructor(
    private readonly renderer: WebGLRenderer,
    private readonly camera: PerspectiveCamera,
    private readonly container: HTMLElement
  ) {
    this.setSize();
    this.callback = this.resize.bind(this);
    window.addEventListener('resize', this.callback, false);
  }

  stop() {
    window.removeEventListener('resize', this.callback);
  }

  private setSize() {
    this.size = {
      width: this.container.offsetWidth,
      height: this.container.offsetHeight,
    };
  }

  private resize() {
    this.setSize();
    this.renderer.setSize(this.size.width, this.size.height);
    this.camera.aspect = this.size.width / this.size.height;
    this.camera.updateProjectionMatrix();
  }
}

export default Resize;
