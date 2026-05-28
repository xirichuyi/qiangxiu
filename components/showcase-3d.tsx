"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { Suspense } from "react"
import type { Stitch } from "@/lib/data"

function EmbroideryThread({ stitch }: { stitch: Stitch }) {
  const petalCount = 8
  const borderCount = 16

  return (
    <group>
      {/* 中心花心 */}
      <mesh position={[0, stitch.displacement * 1.2, 0]}>
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshPhysicalMaterial
          color={stitch.color}
          roughness={stitch.roughness}
          metalness={stitch.metalness}
          sheen={stitch.sheen}
          sheenColor={stitch.color}
          clearcoat={stitch.metalness > 0.3 ? 0.4 : 0.1}
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
          >
            <capsuleGeometry args={[0.08, 0.34, 8, 16]} />
            <meshPhysicalMaterial
              color={stitch.color}
              roughness={stitch.roughness}
              metalness={stitch.metalness}
              sheen={stitch.sheen}
              sheenColor={stitch.color}
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
          >
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshPhysicalMaterial
              color={stitch.color}
              roughness={stitch.roughness * 1.05}
              metalness={stitch.metalness}
              sheen={stitch.sheen}
              sheenColor={stitch.color}
            />
          </mesh>
        )
      })}

      {/* 外圈边花 */}
      {Array.from({ length: borderCount }).map((_, i) => {
        const angle = (i * Math.PI * 2) / borderCount
        const r = 1.25
        const h = Math.max(0.05, stitch.displacement * 0.65)
        return (
          <mesh
            key={`b${i}`}
            position={[Math.cos(angle) * r, h / 2 + 0.02, Math.sin(angle) * r]}
            rotation={[0, -angle, 0]}
          >
            <boxGeometry args={[0.16, h, 0.1]} />
            <meshPhysicalMaterial
              color={stitch.color}
              roughness={stitch.roughness}
              metalness={stitch.metalness}
              sheen={stitch.sheen * 0.85}
              sheenColor={stitch.color}
            />
          </mesh>
        )
      })}
    </group>
  )
}

function FabricBase() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[3.4, 3.4]} />
      <meshStandardMaterial color="#1A1A1A" roughness={0.95} metalness={0} />
    </mesh>
  )
}

export default function ShowcaseCanvas({ stitch }: { stitch: Stitch }) {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [2.6, 2.4, 2.6], fov: 38 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3.2, 4.2, 2.4]} intensity={1.3} />
        <pointLight position={[-2.5, 2.5, -2]} intensity={0.55} color="#FFD27A" />
        <pointLight position={[2.5, 1.5, -2.5]} intensity={0.35} color="#A02C2C" />
        <FabricBase />
        <EmbroideryThread stitch={stitch} />
      </Suspense>
      <OrbitControls
        enablePan={false}
        enableZoom
        enableRotate
        minDistance={2.2}
        maxDistance={6}
        maxPolarAngle={Math.PI / 2.1}
      />
    </Canvas>
  )
}
