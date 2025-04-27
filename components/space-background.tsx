"use client"

import { useEffect, useRef } from "react"

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Star properties
    const stars: { x: number; y: number; radius: number; opacity: number; speed: number }[] = []
    const numStars = Math.floor((window.innerWidth * window.innerHeight) / 2000) // Responsive number of stars

    // Create stars
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        opacity: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.05,
      })
    }

    // Animation
    let animationFrameId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw stars
      stars.forEach((star) => {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.fill()

        // Twinkle effect
        star.opacity += Math.random() * 0.02 - 0.01
        star.opacity = Math.max(0.2, Math.min(1, star.opacity))

        // Subtle movement
        star.y += star.speed
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }
      })

      // Draw nebula-like gradients
      const drawNebula = (x: number, y: number, radius: number, color1: string, color2: string) => {
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
        gradient.addColorStop(0, color1)
        gradient.addColorStop(1, color2)
        ctx.fillStyle = gradient
        ctx.globalAlpha = 0.05
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1
      }

      // Add a few nebula effects
      drawNebula(
        canvas.width * 0.2,
        canvas.height * 0.3,
        canvas.width * 0.4,
        "rgba(63, 81, 181, 0.3)",
        "rgba(0, 0, 0, 0)",
      )
      drawNebula(
        canvas.width * 0.8,
        canvas.height * 0.7,
        canvas.width * 0.5,
        "rgba(156, 39, 176, 0.3)",
        "rgba(0, 0, 0, 0)",
      )
      drawNebula(
        canvas.width * 0.5,
        canvas.height * 0.5,
        canvas.width * 0.6,
        "rgba(33, 150, 243, 0.2)",
        "rgba(0, 0, 0, 0)",
      )

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10" />
}
