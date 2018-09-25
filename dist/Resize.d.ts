import { PerspectiveCamera, WebGLRenderer } from 'three';
declare class Resize {
    private readonly renderer;
    private readonly camera;
    private readonly container;
    private size;
    private readonly callback;
    constructor(renderer: WebGLRenderer, camera: PerspectiveCamera, container: HTMLElement);
    stop(): void;
    private setSize;
    private resize;
}
export default Resize;
//# sourceMappingURL=Resize.d.ts.map