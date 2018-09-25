import { Component } from 'pulsar-pathfinding';
export default class Render extends Component {
    constructor({ renderer, camera, scene }) {
        super();
        this.renderer = renderer;
        this.camera = camera;
        this.scene = scene;
    }
    update() {
        this.renderer.render(this.scene, this.camera);
    }
}
//# sourceMappingURL=Render.js.map