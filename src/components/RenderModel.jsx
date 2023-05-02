import React, { useRef } from 'react'
import { Canvas, useLoader, useThree,  } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { TextureLoader, MeshBasicMaterial, RepeatWrapping } from 'three'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { Color } from 'three'

function ClothModel({ texture: { file }, model, scale, hsl, rotation, position }) {
  const obj = useLoader(OBJLoader, model?.obj)
  const texture = useLoader(TextureLoader, file, (loader) => {
    loader.magFilter = THREE.LinearFilter
    loader.minFilter = THREE.LinearFilter
    loader.anisotropy = 16
    loader.premultiplyAlpha = true
  })

  const { invalidate } = useThree()

  texture.wrapS = texture.wrapT = RepeatWrapping
  texture.repeat.set(1 - scale, 1 - scale)
  texture.offset.set(0, 0)
  texture.rotation = rotation

  const material = new MeshBasicMaterial({
    map: texture,
    color: new Color().setHSL(hsl.hue, hsl.saturation, hsl.lightness),
    side: THREE.DoubleSide,
    transparent: true,
    alphaTest: 0.5,
    depthWrite: false,
  })

  let lastX, lastY
  const handlePointerMove = (event) => {
    if (event.pressure > 0) {
      const offsetX = event.uv.x
      const offsetY = event.uv.y
      if (lastX && lastY) {
        const deltaX = offsetX - lastX
        const deltaY = offsetY - lastY
        texture.offset.x -= deltaX
        texture.offset.y -= deltaY
        invalidate()
      }
      lastX = offsetX
      lastY = offsetY
    } else {
      lastX = null
      lastY = null
    }
  }
  const lightRef = useRef(null)
  const shirtRef = useRef(null)

  return (
    <mesh
      ref={shirtRef}
      geometry={obj.children[0].geometry}
      material={material}
      onPointerDown={(event) => {
        event.stopPropagation()
        event.target.setPointerCapture(event.pointerId)
      }}
      onPointerMove={handlePointerMove}
      onWheel={(event) => {
        if (event.deltaY !== 0) {
          const delta = event.deltaY > 0 ? -0.1 : 0.1
          texture.repeat.set(texture.repeat.x - delta, texture.repeat.y - delta)
          texture.repeat.clampScalar(0.1, 6)
          invalidate()
        }
      }}
      onPointerUp={(event) => {
        event.target.releasePointerCapture(event.pointerId)
        lastX = null
        lastY = null
      }}
      position={position}>
      <meshStandardMaterial attach="material" map={material.map} color={material.color} transparent={material.transparent} side={material.side} alphaTest={material.alphaTest} depthWrite={material.depthWrite} />
      <pointLight position={[0, 0, 0.7]} intensity={0.5} />
    </mesh>
  )
}

function ImagePlane({ model, position,blendMode, applyBlendMode,...rest }) {
  const texture = useLoader(TextureLoader, model)
  const lightRef = useRef(null)
  // texture.repeat.set(1 ,1)

  return (
    <mesh position={position}>
      <planeBufferGeometry attach="geometry" args={[2, 2]} />
      <meshStandardMaterial attach="material" map={texture} blending={blendMode}  transparent {...rest} color={"white"} />
      {applyBlendMode && (
        <>
          <ambientLight />
          <pointLight ref={lightRef} position={[0, 0, 0]} intensity={6} />
        </>
      )}
    </mesh>
  )
}

function RenderModel({ className, model, texture, scale, hsl, rotation }) {
  const canvasRef = useRef(null)
  
  return (
    <div className={`${className}`}>
      <Canvas ref={canvasRef} camera={{ position: [0, 0, 6], fov: 23 }}>
        <ClothModel model={model} texture={texture} position={[0, 0, 0]} scale={scale} hsl={hsl} rotation={rotation} />
        <ImagePlane model={model.front} position={[0, 0, 0]} scale={[1, 1, 1]} applyBlendMode={false} />
        <ImagePlane model={model.overlay} position={[0, 0, 0]} scale={[1, 1, 1]} blendMode={THREE.MultiplyBlending} applyBlendMode={false} />
        <ImagePlane model={model.light} position={[0, 0, 0]} scale={[1, 1, 1]} applyBlendMode={true} blendSrc={THREE.OneFactor} blendDst={THREE.OneMinusSrcColorFactor} blendEquation={THREE.AddEquation} blending={THREE.CustomBlending} />
        <OrbitControls enableRotate={false} enableZoom={false} enablePan={false}  minDistance={2} maxDistance={10} />
        
      </Canvas>
    </div>
  )
}


export default RenderModel
