import React, { useRef } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { TextureLoader ,MeshBasicMaterial,RepeatWrapping } from 'three';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function ShirtModel({model}) { 
  const obj = useLoader(OBJLoader, model?.obj);
  const texture = useLoader(TextureLoader, 'uv_grid_opengl.jpg', (loader) => {
    loader.minFilter = THREE.LinearMipmapLinearFilter; // set minFilter to use mipmapping
  });
  //rotate 90
  // texture.repeat.set(texture.image.width / texture.image.height, 1);
  // texture.center.set(0.5, 0.5);
  // texture.offset.set(0, 0.5);
  //  // Rotate texture by 180 degrees
  //  texture.repeat.set(-1, -1);
  //  texture.center.set(0.5, 0.5);

  texture.wrapS = texture.wrapT = RepeatWrapping; // set wrapping to repeat
  texture.repeat.set(0.9, 0.9); // increase repeat to zoom in on texture
  texture.offset.set(0.25, 0.25); // decrease offset to center texture
  const material = new MeshBasicMaterial({ map: texture, color: new THREE.Color(9, 0.4, 1.5) });
  return <mesh geometry={obj.children[0].geometry} material={material} />;
}


function ImagePlane({model}) {
  const texture = useLoader(TextureLoader, model.bgImg);
  return (
    <mesh position={[0, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[2, 2]} />
      <meshBasicMaterial attach="material" map={texture} />
    </mesh>
  );
}

function RenderModel({className,model,texture}) {
  const canvasRef = useRef(null);

  return (
    <div className={`${className}`}>
      <Canvas ref={canvasRef} camera={{ position: [0, 0, 6],fov:23 }}>
        <ShirtModel model={model} texture={texture} position={[0, 0, 0]} scale={[0.5, 0.5, 0.5]} />
        <ImagePlane model={model}  position={[0, 0, 0]} scale={[1, 1, 1]} />
        <OrbitControls enableRotate={false} enableZoom={true} enablePan={false} minDistance={2} maxDistance={10} />
      </Canvas>
    </div>
  );
}

export default RenderModel;
