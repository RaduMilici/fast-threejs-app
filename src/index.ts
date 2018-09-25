import { WebGLRenderer, Scene, PerspectiveCamera, Object3D } from 'three';
import { Updater, Component, size } from 'pulsar-pathfinding';
import Render from './Render';
import Dispose from './Dispose';
import settings from './settings';
import findElement from './findElement';

export default class App3D {
  readonly camera: PerspectiveCamera;
  readonly renderer: WebGLRenderer;
  readonly container: HTMLElement;

  readonly scene: Scene = new Scene();
  readonly updater: Updater = new Updater();

  constructor(readonly settings: settings) {
    this.camera = App3D.createCamera(settings);
    this.container = findElement(settings.containerSelector);
    this.renderer = App3D.createRenderer(settings);
    this.container.appendChild(this.renderer.domElement);
    this.updater.onUpdateComplete = new Render(this);
  }

  start(): boolean {
    return this.updater.start();
  }

  stop(): boolean {
    return this.updater.stop();
  }

  clear(): void {
    this.updater.clear();
    this.removeChildren(this.scene);
    new Dispose(this.scene);
  }

  add(object: Object3D | Component, parent?: Object3D | Scene): void {
    if (object instanceof Object3D) {
      parent ? parent.add(object) : this.scene.add(object);
    }

    if (object instanceof Component) {
      this.updater.add(object);
    }
  }

  remove(object: Object3D | Component): void {
    if (object instanceof Component) {
      this.updater.remove(object);
    }

    if (object instanceof Object3D && object.parent) {
      object.parent.remove(object);
    }
  }

  private createCamera({ camera, renderer }: settings): PerspectiveCamera {
    const { fov, near, far } = camera;
    const { width, height } = renderer;
    const size: size = this.getSize({ width, height });
    return new PerspectiveCamera(fov, size.width / size.height, near, far);
  }

  private createRenderer({ renderer }: settings): WebGLRenderer {
    const { width, height, antialias, alpha } = renderer;
    const webGLRenderer: WebGLRenderer = new WebGLRenderer({ antialias, alpha });
    const size: size = this.getSize({width, height});
    webGLRenderer.setSize(size.width, size.height);
    return webGLRenderer;
  }

  private removeChildren(parent: Object3D): void {
    for (let i = parent.children.length - 1; i >= 0; i--) {
      this.remove(parent.children[i]);
    }
  }

  private getSize(size: size): size {
    const containerSize: size = {
      width: this.container.offsetWidth,
      height: this.container.offsetHeight
    };

    return Object.assign(containerSize, size);
  }
}
