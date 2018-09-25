class Resize {
    constructor(renderer, camera, container) {
        this.renderer = renderer;
        this.camera = camera;
        this.container = container;
        this.setSize();
        this.callback = this.resize.bind(this);
        window.addEventListener('resize', this.callback, false);
    }
    stop() {
        window.removeEventListener('resize', this.callback);
    }
    setSize() {
        this.size = {
            width: this.container.offsetWidth,
            height: this.container.offsetHeight,
        };
    }
    resize() {
        this.setSize();
        this.renderer.setSize(this.size.width, this.size.height);
        this.camera.aspect = this.size.width / this.size.height;
        this.camera.updateProjectionMatrix();
    }
}
export default Resize;
//# sourceMappingURL=Resize.js.map