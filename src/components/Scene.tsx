'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useRef, useEffect, useState } from 'react'
import { Environment } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import { Robot } from './Robot'
import { DetectionEffects } from './DetectionEffects'
import { DetectionMarker } from './DetectionMarker'

function EMPulse() {
  const mesh       = useRef<THREE.Mesh>(null)
  const triggerMs  = useRef(-9999)
  const wasInZone  = useRef(false)
  const lastIdle   = useRef(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const art = document.getElementById('hero-robot-art')
      if (!art) return
      const r  = art.getBoundingClientRect()
      const cx = r.left + r.width  * 0.5
      const cy = r.top  + r.height * 0.55
      const inZone = Math.hypot(e.clientX - cx, e.clientY - cy) < r.width * 0.6
      if (inZone && !wasInZone.current) {
        const now = performance.now()
        if (now - triggerMs.current > 800) triggerMs.current = now
      }
      wasInZone.current = inZone
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame(({ clock }) => {
    if (!mesh.current) return
    const mat = mesh.current.material as THREE.MeshBasicMaterial
    if (clock.elapsedTime > 2 && clock.elapsedTime - lastIdle.current > 5) {
      triggerMs.current = performance.now()
      lastIdle.current  = clock.elapsedTime
    }
    const DURATION = 500
    const p     = Math.min((performance.now() - triggerMs.current) / DURATION, 1)
    const eased = 1 - Math.pow(1 - p, 2)
    mesh.current.scale.set(eased * 3, 1, eased * 3)
    mat.opacity = p < 1 ? (1 - p) * 0.85 : 0
  })

  return (
    <mesh ref={mesh} position={[0, -1.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.5, 0.016, 8, 64]} />
      <meshBasicMaterial color="#FFB020" transparent opacity={0} depthWrite={false} toneMapped={false} />
    </mesh>
  )
}

export function Scene() {
  // flashKey remounts the border div each time detection fires, restarting the CSS animation
  const [flashKey, setFlashKey] = useState(0)

  const handleDetect = (detected: boolean) => {
    if (detected) setFlashKey(k => k + 1)
  }

  return (
    <>
      <Canvas
        camera={{ position: [0, 2, 4], fov: 40 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        onCreated={({ gl, scene, camera }) => {
          gl.setClearColor(0x000000, 0)
          scene.background = null
          gl.outputColorSpace = THREE.SRGBColorSpace
          gl.toneMapping = THREE.ACESFilmicToneMapping
          gl.toneMappingExposure = 0.55
          camera.lookAt(0, 1, 0)
        }}
        shadows
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        style={{ width: '100%', height: '100%', background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.07} color="#ffffff" />
          <pointLight position={[0, 0, 6]}  color="#ffffff" intensity={0.3}  distance={15} decay={1.5} />
          <pointLight position={[-4, 0, 3]} color="#ffffff" intensity={0.25} distance={12} decay={1.5} />
          <pointLight position={[4, 0, 3]}  color="#ffffff" intensity={0.15} distance={12} decay={1.5} />

          <Robot />
          <EMPulse />
          <DetectionEffects />
          <DetectionMarker onDetect={handleDetect} />

          <Environment preset="studio" background={false} environmentIntensity={0.06} blur={1} />

          <EffectComposer>
            <Bloom
              luminanceThreshold={0.88}
              luminanceSmoothing={0.9}
              intensity={0.35}
              mipmapBlur
              radius={0.5}
            />
          </EffectComposer>

        </Suspense>
      </Canvas>

      {/* Viewport border flash — remounted on each detection to restart animation */}
      {flashKey > 0 && (
        <div key={flashKey} className="viewport-flash" />
      )}
    </>
  )
}
