import { Scene, UniversalCamera, Vector3 } from '@babylonjs/core'

export default function CreateDefaultCamera(scene: Scene, position: Vector3, target: Vector3) {
  const engine = scene.getEngine()
  const canvas = engine.getRenderingCanvas()

  const initialPosition = new Vector3(position.x, position.y, position.z)

  const camera = new UniversalCamera('player camera', position, scene)

  camera.setTarget(target)

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true)

  // Enable Pointer Lock
  scene.onPointerDown = (evt): void => {
    if (evt.button === 0) {
      engine.enterPointerlock()
    }
  }

  camera.applyGravity = true
  camera.checkCollisions = true

  // Creates a collision-enabled camera object
  camera.ellipsoid = new Vector3(0.4, 1.7, 0.4)

  // Reduce camera near clipping plane
  camera.minZ = 0.2
  // Reduce camera speed
  const defaultSpeed = 0.25
  // const defaultSpeed = 0;
  camera.speed = defaultSpeed

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.platform)

  if (isMobile) {
    // Increase camera rotation speed on mobile
    camera.angularSensibility = 500
    console.log('mobile')
  } else {
    // Reduce camera rotation speed
    camera.angularSensibility = 6000
    console.log('desktop')
  }

  camera.keysUp.push(87)
  camera.keysLeft.push(65)
  camera.keysDown.push(83)
  camera.keysRight.push(68)

  window.addEventListener('keydown', (evt) => {
    switch (evt.code) {
      case 'ShiftLeft':
        camera.speed = defaultSpeed * 1.8
        break
      case 'Space':
        console.log('jump')
        break
      case 'KeyR':
        // Reset camera position
        camera.position.set(initialPosition.x, initialPosition.y, initialPosition.z)
      default:
        break
    }
  })
  window.addEventListener('keyup', (evt) => {
    if (evt.key === 'Shift') {
      camera.speed = defaultSpeed
    }
  })
}
