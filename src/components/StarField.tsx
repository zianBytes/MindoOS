import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface StarLayerConfig {
  count: number
  radius: number
  size: number
  parallax: number
  drift: number
  color: number
}

const LAYERS: StarLayerConfig[] = [
  { count: 1800, radius: 600, size: 1.4, parallax: 12, drift: 0.0015, color: 0xffffff },
  { count: 1200, radius: 950, size: 2.2, parallax: 28, drift: 0.001, color: 0xbcd4ff },
  { count: 600, radius: 1350, size: 3.2, parallax: 48, drift: 0.0006, color: 0xffe9c4 },
]

const VERTEX_SHADER = `
  attribute float size;
  attribute float phase;
  attribute float speed;
  uniform float time;
  varying float vAlpha;
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    float twinkle = 0.55 + 0.45 * sin(time * speed + phase);
    vAlpha = twinkle;
    gl_PointSize = size * twinkle * (1600.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const FRAGMENT_SHADER = `
  uniform vec3 color;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    float alpha = smoothstep(0.5, 0.0, d) * vAlpha;
    gl_FragColor = vec4(color, alpha);
  }
`

function createLayer(config: StarLayerConfig): THREE.Points {
  const positions = new Float32Array(config.count * 3)
  const sizes = new Float32Array(config.count)
  const phases = new Float32Array(config.count)
  const speeds = new Float32Array(config.count)

  for (let i = 0; i < config.count; i++) {
    const r = config.radius * (0.4 + 0.6 * Math.random())
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = r * Math.cos(phi)

    sizes[i] = config.size * (0.5 + Math.random())
    phases[i] = Math.random() * Math.PI * 2
    speeds[i] = 0.5 + Math.random() * 1.5
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
  geometry.setAttribute('phase', new THREE.BufferAttribute(phases, 1))
  geometry.setAttribute('speed', new THREE.BufferAttribute(speeds, 1))

  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      color: { value: new THREE.Color(config.color) },
    },
    vertexShader: VERTEX_SHADER,
    fragmentShader: FRAGMENT_SHADER,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })

  return new THREE.Points(geometry, material)
}

export default function StarField() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, 1, 1, 3000)
    camera.position.z = 1

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    const layers = LAYERS.map((config) => {
      const points = createLayer(config)
      scene.add(points)
      return { points, config }
    })

    const pointer = { x: 0, y: 0 }
    const pointerTarget = { x: 0, y: 0 }

    const handlePointerMove = (event: PointerEvent) => {
      pointerTarget.x = (event.clientX / window.innerWidth) * 2 - 1
      pointerTarget.y = (event.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', handlePointerMove)

    const resize = () => {
      const width = container.clientWidth
      const height = container.clientHeight
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }
    resize()

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)

    let frameId: number
    const clock = new THREE.Clock()

    const animate = () => {
      const elapsed = clock.getElapsedTime()

      pointer.x += (pointerTarget.x - pointer.x) * 0.04
      pointer.y += (pointerTarget.y - pointer.y) * 0.04

      for (const { points, config } of layers) {
        const material = points.material as THREE.ShaderMaterial
        material.uniforms.time.value = elapsed

        points.position.x = -pointer.x * config.parallax
        points.position.y = pointer.y * config.parallax
        points.rotation.y = elapsed * config.drift
        points.rotation.x = elapsed * config.drift * 0.5
      }

      renderer.render(scene, camera)
      frameId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('pointermove', handlePointerMove)
      resizeObserver.disconnect()
      for (const { points } of layers) {
        points.geometry.dispose()
        ;(points.material as THREE.ShaderMaterial).dispose()
      }
      renderer.dispose()
      container.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        background: '#03040a',
      }}
    />
  )
}
