type settings = {
  containerSelector: string;
  camera: {
    fov: number;
    near: number;
    far: number;
  };
  renderer: {
    width: number;
    height: number;
    antialias: boolean;
  };
};

export default settings;
