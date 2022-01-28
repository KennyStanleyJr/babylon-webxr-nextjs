import { HemisphericLight, MeshBuilder, Scene, Vector3 } from '@babylonjs/core'
import BabylonCanvas from '@/components/BabylonCanvas'
import CreateImmersiveCamera from './common/CreateImmersiveCamera'

export default function Home() {
  return <BabylonCanvas antialias onSceneReady={onSceneReady} onRender={onRender} id="my-canvas" />
}

async function onSceneReady(scene: Scene) {
  scene.collisionsEnabled = true

  const initialCameraPosition = new Vector3(0, 1.7, 0)
  const initialCameraTarget = new Vector3(1, 1.7, 0)
  CreateImmersiveCamera(scene, initialCameraPosition, initialCameraTarget)
  CreateLights(scene)
  const ground = CreateGround(scene)
  const xr = await scene.createDefaultXRExperienceAsync({
    floorMeshes: [ground],
  })
}

// Will run on every frame render
function onRender(scene: Scene) {}

function CreateLights(scene: Scene) {
  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  var light = new HemisphericLight('light', new Vector3(0, 1, 0), scene)

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7
}

function CreateGround(scene: Scene) {
  // Our built-in 'ground' shape.
  const ground = MeshBuilder.CreateGround('ground', { width: 200, height: 200 }, scene)
  ground.checkCollisions = true
  return ground
}
