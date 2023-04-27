import React, { useEffect, useRef } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { TextureLoader, MeshBasicMaterial, RepeatWrapping } from 'three'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { Color } from 'three'
function ShirtModel({ texture:{file} ,model, scale, hsl ,rotation}) {
  const obj = useLoader(OBJLoader, model?.obj)
  const texture = useLoader(TextureLoader, "textures/uv_grid_opengl.jpg", (loader) => {
    loader.minFilter = THREE.LinearMipmapLinearFilter // set minFilter to use mipmapping
  })
 
  texture.wrapS = texture.wrapT = RepeatWrapping // set wrapping to repeat
  texture.repeat.set(1 - scale, 1 - scale) // increase repeat to zoom in on texture
  texture.offset.set(0.5, 0.5) // decrease offset to center texture
  const color = new Color()
  texture.rotation=rotation  
  color.setHSL(hsl.hue,hsl.saturation,hsl.lightness)
  const material = new MeshBasicMaterial({ map: texture, color: color })
  return <mesh geometry={obj.children[0].geometry} material={material} />
}

function ImagePlane({ model }) {
  const texture = useLoader(TextureLoader, model.bgImg)
  return (
    <mesh position={[0, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[2, 2]} />
      <meshBasicMaterial attach="material" map={texture} />
    </mesh>
  )
}

function RenderModel({ className, model, texture, scale,hsl ,rotation}) {
  const canvasRef = useRef(null)
  const handleMouseDown = (e) => {
    // code to handle mouse down event
    console.log("down");
  }

  
  const handleMouseUp = (e) => {
    // code to handle mouse up event
    console.log("up");

  }
  useEffect(() => {
    const canvas = canvasRef.current

    canvas.addEventListener('mousedown', handleMouseDown)
    canvas.addEventListener('mouseup', handleMouseUp)

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown)
      canvas.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])
  return (
    <div className={`${className}`}>
      <Canvas ref={canvasRef} camera={{ position: [0, 0, 6], fov: 23 }}>
        <ShirtModel model={model} texture={texture} position={[0, 0, 0]} scale={scale} hsl={hsl} rotation={rotation} />
        <ImagePlane model={model} position={[0, 0, 0]} scale={[1, 1, 1]} />
        <OrbitControls enableRotate={false} enableZoom={true} enablePan={false} minDistance={2} maxDistance={10} />
      </Canvas>
    </div>
  )
}

export default RenderModel
