'use client'
import { useRef, useMemo, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

const DEFAULT_ROBOT_POS = new THREE.Vector3(0, -0.35, 0)

interface Props {
  robotPosition?: THREE.Vector3
  onDetect?: (detected: boolean) => void
}

export function DetectionMarker({ robotPosition = DEFAULT_ROBOT_POS, onDetect }: Props) {
  const { camera, pointer } = useThree()

  const [detected, setDetected] = useState(false)
  const detectedRef  = useRef(false)   // mirrors state — readable in useFrame without closure
  const shrinkStart  = useRef(-9999)

  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)

  // Cursor projected to robot's horizontal plane
  const cursor3D  = useRef(new THREE.Vector3(5, robotPosition.y, 0))
  const projPlane = useMemo(
    () => new THREE.Plane(new THREE.Vector3(0, 1, 0), -robotPosition.y),
    [robotPosition]
  )
  const rc = useMemo(() => new THREE.Raycaster(), [])

  useFrame(({ clock }) => {
    // Project mouse cursor onto the robot's Y plane
    rc.setFromCamera(pointer, camera)
    rc.ray.intersectPlane(projPlane, cursor3D.current)

    // Move the group to follow agent every frame (no React state = no re-renders)
    if (groupRef.current) groupRef.current.position.copy(cursor3D.current)

    // Distance-based detection (3D, per spec)
    const dist       = cursor3D.current.distanceTo(robotPosition)
    const shouldOn   = dist < 3
    const shouldOff  = dist > 4

    if (shouldOn && !detectedRef.current) {
      detectedRef.current = true
      shrinkStart.current = performance.now()
      setDetected(true)
      onDetect?.(true)
    } else if (shouldOff && detectedRef.current) {
      detectedRef.current = false
      setDetected(false)
      onDetect?.(false)
    }

    // Skip ring animation when inactive (refs may be null after unmount)
    if (!detectedRef.current) return

    const t    = clock.elapsedTime
    const now  = performance.now()
    const shrinkP = Math.min((now - shrinkStart.current) / 400, 1)

    // Scale 2 → 1 over 400 ms, then pulse continuously
    const base   = shrinkP < 1 ? 2 - shrinkP : 1
    const pulse1 = shrinkP >= 1 ? 1 + Math.sin(t * 3.2) * 0.05 : 1        // 0.95 ↔ 1.05
    const pulse2 = shrinkP >= 1 ? 1 + Math.sin(t * 3.2 + 1.2) * 0.04 : 1  // out of phase

    if (ring1Ref.current) ring1Ref.current.scale.setScalar(base * pulse1)
    if (ring2Ref.current) ring2Ref.current.scale.setScalar(base * pulse2)
  })

  if (!detected) return null

  return (
    <group
      ref={groupRef}
      position={[cursor3D.current.x, cursor3D.current.y, cursor3D.current.z]}
    >
      {/* ── Inner targeting ring ── */}
      <mesh ref={ring1Ref} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.8, 1.0, 64]} />
        <meshBasicMaterial
          color="#FF0000"
          transparent
          opacity={0.9}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* ── Outer ambient ring (slightly out of phase) ── */}
      <mesh ref={ring2Ref} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.2, 1.3, 64]} />
        <meshBasicMaterial
          color="#FF2020"
          transparent
          opacity={0.4}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* ── Floating DETECTED label ── */}
      <Html
        position={[0, 2.2, 0]}
        center
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        <div className="dm-label">
          <span className="dm-title">DETECTED</span>
          <span className="dm-sub dm-blink">THREAT NEUTRALIZING</span>
        </div>
      </Html>
    </group>
  )
}
