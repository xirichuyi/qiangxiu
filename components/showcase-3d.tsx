"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, ContactShadows } from "@react-three/drei"
import { Suspense, useMemo, useRef } from "react"
import * as THREE from "three"
import type { Stitch } from "@/lib/data"

function FabricBase() {
  // 程序化生成布面微纹理，让黑底有真实的织物感
  const texture = useMemo(() => {
    const size = 256
    const canvas = document.createElement("canvas")
    canvas.width = canvas.height = size
    const ctx = canvas.getContext("2d")!
    ctx.fillStyle = "#1A1A1A"
    ctx.fillRect(0, 0, size, size)
    for (let i = 0; i < 2400; i++) {
      const x = Math.random() * size
      const y = Math.random() * size
      const a = 0.08 + Math.random() * 0.12
      ctx.fillStyle = `rgba(255,255,255,${a})`
      ctx.fillRect(x, y, 1, 1)
    }
    const tex = new THREE.CanvasTexture(canvas)
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping
    tex.repeat.set(4, 4)
    return tex
  }, [])

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[3.4, 3.4, 64, 64]} />
      <meshStandardMaterial map={texture} roughness={0.95} metalness={0} color="#1A1A1A" />
    </mesh>
  )
}

function EmbroideryThread({ stitch }: { stitch: Stitch }) {
  // 中心花心 + 8 瓣花瓣 + 一圈边花点缀
  const groupRef = useRef<THREE.Group>(null)
  const petalCount = 8
  const borderCount = 16
  const sheenColor = new THREE.Color(stitch.color).lerp(new THREE.Color("#ffffff"), 0.35)

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 花心 */}
      <mesh position={[0, stitch.displacement * 1.2, 0]} castShadow>
        <sphereGeometry args={[0.18, 48, 48]} />
        <meshPhysicalMaterial
          color={stitch.color}
          roughness={stitch.roughness}
          metalness={stitch.metalness}
          sheen={stitch.sheen}
          sheenColor={sheenColor}
          sheenRoughness={Math.max(0.1, 1 - stitch.sheen)}
          clearcoat={stitch.metalness > 0.3 ? 0.6 : 0.15}
          clearcoatRoughness={0.5}
        />
      </mesh>

      {/* 花瓣 */}
      {Array.from({ length: petalCount }).map((_, i) => {
        const angle = (i * Math.PI * 2) / petalCount
        const r = 0.55
        return (
          <mesh
            key={`p${i}`}
            position={[Math.cos(angle) * r, stitch.displacement * 0.9, Math.sin(angle) * r]}
            rotation={[Math.PI / 2, 0, -angle]}
            castShadow
          >
            <capsuleGeometry args={[0.08, 0.34, 12, 24]} />
            <meshPhysicalMaterial
              color={stitch.color}
              roughness={stitch.roughness}
              metalness={stitch.metalness}
              sheen={stitch.sheen}
              sheenColor={sheenColor}
              sheenRoughness={Math.max(0.1, 1 - stitch.sheen)}
              clearcoat={stitch.metalness > 0.3 ? 0.5 : 0.1}
            />
          </mesh>
        )
      })}

      {/* 内圈打籽点 */}
      {Array.from({ length: petalCount }).map((_, i) => {
        const angle = (i * Math.PI * 2) / petalCount + Math.PI / petalCount
        const r = 0.32
        return (
          <mesh
            key={`d${i}`}
            position={[Math.cos(angle) * r, stitch.displacement * 1.1, Math.sin(angle) * r]}
            castShadow
          >
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshPhysicalMaterial
              color={stitch.color}
              roughness={stitch.roughness * 1.05}
              metalness={stitch.metalness}
              sheen={stitch.sheen}
              sheenColor={sheenColor}
            />
          </mesh>
        )
      })}

      {/* 外圈边花 */}
      {Array.from({ length: borderCount }).map((_, i) => {
        const angle = (i * Math.PI * 2) / borderCount
        const r = 1.25
        const h = stitch.displacement * 0.65
        return (
          <mesh
            key={`b${i}`}
            position={[Math.cos(angle) * r, h / 2 + 0.02, Math.sin(angle) * r]}
            rotation={[0, -angle, 0]}
            castShadow
          >
            <boxGeometry args={[0.16, h, 0.1]} />
            <meshPhysicalMaterial
              color={stitch.color}
              roughness={stitch.roughness}
              metalness={stitch.metalness}
              sheen={stitch.sheen * 0.85}
              sheenColor={sheenColor}
            />
          </mesh>
        )
      })}
    </group>
  )
}

function Scene({ stitch }: { stitch: Stitch }) {
  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight
        position={[3.2, 4.2, 2.4]}
        intensity={1.3}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-4}
        shadow-camera-right={4}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
      />
      <pointLight position={[-2.5, 2.5, -2]} intensity={0.55} color="#FFD27A" />
      <pointLight position={[2.5, 1.5, -2.5]} intensity={0.35} color="#A02C2C" />

      <FabricBase />
      <EmbroideryThread stitch={stitch} />
      <ContactShadows position={[0, 0.001, 0]} opacity={0.55} blur={2.4} far={4} resolution={512} />
    </>
  )
}

export default function ShowcaseCanvas({ stitch }: { stitch: Stitch }) {
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [2.6, 2.4, 2.6], fov: 38 }}>
      <Suspense fallback={null}>
        <Scene stitch={stitch} />
      </Suspense>
      <OrbitControls
        enablePan={false}
        enableZoom
        enableRotate
        makeDefault
        minDistance={2.2}
        maxDistance={6}
        maxPolarAngle={Math.PI / 2.1}
      />
    </Canvas>
  )
}
