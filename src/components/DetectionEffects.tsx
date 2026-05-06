'use client'
import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const DEFAULT_ROBOT_POS = new THREE.Vector3(0, -0.35, 0)

function buildArcGeo(from: THREE.Vector3, to: THREE.Vector3): THREE.TubeGeometry {
  const pts: THREE.Vector3[] = [from.clone()]
  for (let i = 1; i <= 8; i++) {
    const t = i / 9
    const mid = new THREE.Vector3().lerpVectors(from, to, t)
    mid.x += (Math.random() - 0.5) * 0.9
    mid.y += (Math.random() - 0.5) * 0.6
    mid.z += (Math.random() - 0.5) * 0.9
    pts.push(mid)
  }
  pts.push(to.clone())
  return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 20, 0.04, 6, false)
}

interface Props {
  robotPosition?: THREE.Vector3
}

export function DetectionEffects({ robotPosition = DEFAULT_ROBOT_POS }: Props) {
  const { camera, pointer } = useThree()

  // Screen-space mouse for reliable DOM zone detection
  const mouse = useRef({ x: -1000, y: -1000 })
  useEffect(() => {
    const h = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', h)
    return () => window.removeEventListener('mousemove', h)
  }, [])

  // Horizontal plane at robot height for projecting cursor to 3D arc endpoint
  const cursor3D = useRef(robotPosition.clone().add(new THREE.Vector3(2, 0, 0)))
  const projPlane = useMemo(
    () => new THREE.Plane(new THREE.Vector3(0, 1, 0), -robotPosition.y),
    [robotPosition]
  )
  const rc = useMemo(() => new THREE.Raycaster(), [])

  // ── Effect 1: shockwave ────────────────────────────────────────
  const shockRef    = useRef<THREE.Mesh>(null)
  const shockActive = useRef(false)
  const shockStart  = useRef(-9999)

  // ── Effect 2: electric arc (imperative mesh — avoids reconciler reset) ───
  const arcMesh = useMemo(() => {
    const initPts = [
      robotPosition.clone(),
      robotPosition.clone().add(new THREE.Vector3(0.01, 0.1, 0)),
      robotPosition.clone().add(new THREE.Vector3(0.02, 0, 0.01)),
    ]
    const geo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(initPts), 20, 0.04, 6, false)
    const mat = new THREE.MeshStandardMaterial({
      color:             new THREE.Color('#378ADD'),
      emissive:          new THREE.Color('#378ADD'),
      emissiveIntensity: 3,
      transparent:       true,
      opacity:           0,
      depthWrite:        false,
      toneMapped:        false,
    })
    const mesh = new THREE.Mesh(geo, mat)
    mesh.visible = false
    return mesh
  }, [robotPosition])

  const arcActive  = useRef(false)
  const arcStart   = useRef(-9999)
  const arcFrameN  = useRef(0)

  // ── Detection ─────────────────────────────────────────────────
  const wasInZone   = useRef(false)
  const lastTrigger = useRef(-9999)

  useFrame(() => {
    const now = performance.now()

    // Project cursor onto robot's horizontal plane (for arc endpoint)
    rc.setFromCamera(pointer, camera)
    const hit = new THREE.Vector3()
    if (rc.ray.intersectPlane(projPlane, hit)) cursor3D.current.copy(hit)

    // ── Zone detection (won't abort animation if element missing) ──
    const art = document.getElementById('hero-robot-art')
    if (art) {
      const r     = art.getBoundingClientRect()
      const cx    = r.left + r.width  * 0.5
      const cy    = r.top  + r.height * 0.55
      const inZone = Math.hypot(mouse.current.x - cx, mouse.current.y - cy) < r.width * 0.6

      if (inZone && !wasInZone.current && now - lastTrigger.current > 1200) {
        lastTrigger.current = now
        // Effect 1 — immediate
        shockActive.current = true
        shockStart.current  = now
        // Effect 2 — 300 ms later
        setTimeout(() => {
          arcActive.current = true
          arcStart.current  = performance.now()
          arcFrameN.current = 0
        }, 300)
      }
      wasInZone.current = inZone
    }

    // ── Animate shockwave (always runs regardless of DOM) ──────────
    if (shockRef.current) {
      if (shockActive.current) {
        const p = Math.min((now - shockStart.current) / 600, 1)
        // Uniform scale keeps ring circular after X-rotation
        const s = 0.1 + p * 2.4                                    // 0.1 → 2.5
        shockRef.current.scale.setScalar(s)
        ;(shockRef.current.material as THREE.MeshBasicMaterial).opacity = 0.8 * (1 - p)
        shockRef.current.visible = true
        if (p >= 1) {
          shockActive.current      = false
          shockRef.current.visible = false
        }
      } else {
        shockRef.current.visible = false
      }
    }

    // ── Animate electric arc (always runs regardless of DOM) ───────
    if (arcActive.current) {
      const p = Math.min((now - arcStart.current) / 800, 1)
      arcFrameN.current++

      if (arcFrameN.current % 3 === 0) {
        arcMesh.geometry.dispose()
        arcMesh.geometry = buildArcGeo(robotPosition, cursor3D.current)
      }

      ;(arcMesh.material as THREE.MeshStandardMaterial).opacity =
        p < 0.8 ? 1 : 1 - (p - 0.8) / 0.2
      arcMesh.visible = true

      if (p >= 1) {
        arcActive.current = false
        arcMesh.visible   = false
      }
    } else {
      arcMesh.visible = false
    }
  })

  return (
    <>
      {/* Effect 1 — amber shockwave ring, flat on horizontal plane */}
      <mesh
        ref={shockRef}
        position={[robotPosition.x, robotPosition.y, robotPosition.z]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.1}
        visible={false}
      >
        {/* radius=1 so mesh scale directly equals world radius */}
        <torusGeometry args={[1, 0.05, 8, 64]} />
        <meshBasicMaterial
          color="#EF9F27"
          transparent
          opacity={0}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Effect 2 — electric arc, geometry rebuilt in useFrame */}
      <primitive object={arcMesh} />
    </>
  )
}
