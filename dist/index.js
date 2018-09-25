import { WebGLRenderer, Scene, PerspectiveCamera, Object3D } from 'three';
import { Updater, Component } from 'pulsar-pathfinding';
import Resize from './Resize';
import Render from './Render';
import Dispose from './Dispose';
import findElement from './findElement';
export default class App3D {
    constructor(settings) {
        this.settings = settings;
        this.scene = new Scene();
        this.updater = new Updater();
        this.container = findElement(settings.containerSelector);
        this.camera = this.createCamera(settings);
        this.renderer = this.createRenderer(settings);
        this.container.appendChild(this.renderer.domElement);
        this.updater.onUpdateComplete = new Render(this);
    }
    start() {
        this.resize = new Resize(this.renderer, this.camera, this.container);
        return this.updater.start();
    }
    stop() {
        this.resize.stop();
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
    createCamera({ camera, renderer }) {
        const { fov, near, far } = camera;
        const { width, height } = renderer;
        const size = this.getSize({ width, height });
        return new PerspectiveCamera(fov, size.width / size.height, near, far);
    }
    createRenderer({ renderer }) {
        const { width, height, antialias, alpha } = renderer;
        const webGLRenderer = new WebGLRenderer({ antialias, alpha });
        const size = this.getSize({ width, height });
        webGLRenderer.setSize(size.width, size.height);
        return webGLRenderer;
    }
    removeChildren(parent) {
        for (let i = parent.children.length - 1; i >= 0; i--) {
            this.remove(parent.children[i]);
        }
    }
    getSize(size) {
        const containerSize = {
            width: this.container.offsetWidth,
            height: this.container.offsetHeight,
        };
        if (typeof size.width === 'number') {
            containerSize.width = size.width;
        }
        if (typeof size.height === 'number') {
            containerSize.height = size.height;
        }
        return containerSize;
    }
}
//# sourceMappingURL=index.js.map