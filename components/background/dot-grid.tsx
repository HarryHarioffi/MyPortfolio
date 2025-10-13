"use client"

import { useEffect, useRef } from "react"

type Props = {
  spacing?: number
  radius?: number
  baseAlpha?: number
  dotSize?: number
  color?: string
}

export function DotGridBackground({
  spacing = 32,
  radius = 160,
  baseAlpha = 0.18,
  dotSize = 1.25,
  color = "236, 234, 205", // warm off-yellow as in reference
}: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null)
  const mouse = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext("2d", { alpha: true })!

    let raf = 0
    let width = 0
    let height = 0
    const dpr = Math.max(1, window.devicePixelRatio || 1)
    let dots: Array<{ x: number; y: number; phase: number }> = []

    function resize() {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = width + "px"
      canvas.style.height = height + "px"
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      buildDots()
    }

    function buildDots() {
      dots = []
      // center-align grid so margins look even
      const cols = Math.ceil(width / spacing) + 2
      const rows = Math.ceil(height / spacing) + 2
      const offsetX = (width % spacing) / 2 - spacing
      const offsetY = (height % spacing) / 2 - spacing
      for (let iy = 0; iy < rows; iy++) {
        for (let ix = 0; ix < cols; ix++) {
          const x = ix * spacing + offsetX
          const y = iy * spacing + offsetY
          dots.push({ x, y, phase: Math.random() * Math.PI * 2 })
        }
      }
    }

    function draw(t: number) {
      ctx.clearRect(0, 0, width, height)
      const time = t / 1000
      for (const d of dots) {
        const dx = d.x - mouse.current.x
        const dy = d.y - mouse.current.y
        const dist = Math.hypot(dx, dy)
        const halo = Math.max(0, 1 - dist / radius) // 0..1
        const twinkle = 0.25 + 0.75 * Math.max(0, Math.sin(time + d.phase) * 0.5 + 0.5)
        const a = Math.min(1, baseAlpha + halo * 0.9) * twinkle

        ctx.fillStyle = `rgba(${color}, ${a})`
        ctx.beginPath()
        ctx.arc(d.x, d.y, dotSize, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    function move(e: MouseEvent) {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }
    function leave() {
      mouse.current.x = -9999
      mouse.current.y = -9999
    }

    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", move, { passive: true })
    window.addEventListener("mouseleave", leave, { passive: true })
    resize()
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mouseleave", leave)
    }
  }, [spacing, radius, baseAlpha, dotSize, color])

  return <canvas ref={ref} className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true" />
}
