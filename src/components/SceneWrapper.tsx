'use client'
import dynamic from 'next/dynamic'

const SceneNoSSR = dynamic(
  () => import('./Scene').then((m) => ({ default: m.Scene })),
  { ssr: false, loading: () => null }
)

export function SceneWrapper() {
  return <SceneNoSSR />
}
