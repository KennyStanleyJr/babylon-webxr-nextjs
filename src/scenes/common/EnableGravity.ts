import { Scene, Vector3 } from '@babylonjs/core'

export default function EnableGravity(scene: Scene) {
  const framesPerSecond = 60
  const gravity = -9.81
  scene.gravity = new Vector3(0, gravity / framesPerSecond, 0)
  // scene.enablePhysics(null, new AmmoJSPlugin(true, ammoModule));
}
