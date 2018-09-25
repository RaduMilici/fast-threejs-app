import { WebGLRenderer, Scene, PerspectiveCamera, Object3D } from 'three';
import { Updater, Component } from 'pulsar-pathfinding';
import settings from './settings';
export default class App3D {
    readonly settings: settings;
    readonly camera: PerspectiveCamera;
    readonly renderer: WebGLRenderer;
    readonly container: HTMLElement;
    readonly scene: Scene;
    readonly updater: Updater;
    constructor(settings: settings);
    start(): boolean;
    stop(): boolean;
    clear(): void;
    add(object: Object3D | Component, parent?: Object3D | Scene): void;
    remove(object: Object3D | Component): void;
    private static createCamera;
    private createRenderer;
    private removeChildren;
}
//# sourceMappingURL=index.d.ts.map