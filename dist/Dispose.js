export default class Dispose {
    constructor(scene) {
        Dispose.hierarchy(scene, Dispose.node);
    }
    static hierarchy(node, callback) {
        for (let i = node.children.length - 1; i >= 0; i--) {
            const child = node.children[i];
            Dispose.hierarchy(child, callback);
            callback(child);
        }
    }
    static node(node) {
        if (node.geometry) {
            node.geometry.dispose();
        }
        if (node.material) {
            if (node.material.map)
                node.material.map.dispose();
            if (node.material.lightMap)
                node.material.lightMap.dispose();
            if (node.material.bumpMap)
                node.material.bumpMap.dispose();
            if (node.material.normalMap)
                node.material.normalMap.dispose();
            if (node.material.specularMap)
                node.material.specularMap.dispose();
            if (node.material.envMap)
                node.material.envMap.dispose();
            node.material.dispose();
        }
    }
}
//# sourceMappingURL=Dispose.js.map