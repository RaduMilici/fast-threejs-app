import { WebGLRenderer, Scene, PerspectiveCamera, Object3D } from 'three';
import { Updater, Component } from 'pulsar-pathfinding';
import Render from './Render';
import Dispose from './Dispose';
import findElement from './findElement';
export default class App3D {
    constructor(settings) {
        this.settings = settings;
        this.scene = new Scene();
        this.updater = new Updater();
        this.camera = App3D.createCamera(settings);
        this.container = findElement(settings.containerSelector);
        this.renderer = this.createRenderer(settings);
        this.container.appendChild(this.renderer.domElement);
        this.updater.onUpdateComplete = new Render(this);
    }
    start() {
        return this.updater.start();
    }
    stop() {
        return this.updater.stop();
    }
    clear() {
        this.updater.clear();
        this.removeChildren(this.scene);
        new Dispose(this.scene);
    }
    add(object, parent) {
        if (object instanceof Object3D) {
            parent ? parent.add(object) : this.scene.add(object);
        }
        if (object instanceof Component) {
            this.updater.add(object);
        }
    }
    remove(object) {
        if (object instanceof Component) {
            this.updater.remove(object);
        }
        if (object instanceof Object3D && object.parent) {
            object.parent.remove(object);
        }
    }
    static createCamera({ camera, renderer }) {
        const { fov, near, far } = camera;
        const { width, height } = renderer;
        return new PerspectiveCamera(fov, width / height, near, far);
    }
    createRenderer({ renderer }) {
        const { width, height, antialias } = renderer;
        const webGLRenderer = new WebGLRenderer({ antialias });
        webGLRenderer.setSize(width || this.container.offsetWidth, height || this.container.offsetHeight);
        return webGLRenderer;
    }
    removeChildren(parent) {
        for (let i = parent.children.length - 1; i >= 0; i--) {
            this.remove(parent.children[i]);
        }
    }
}
//# sourceMappingURL=index.js.map