import { engine, executeTask, PointerEvents, Transform } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { ReactEcsRenderer } from '@dcl/sdk/react-ecs'
import { VoxelCursor } from './vox/cursor'
import { VoxelFloor } from './vox/floor'
import { VoxelManager } from './vox/manager'
export * from '@dcl/sdk' // export all the functions required to make the scene work
import { ui } from './vox/ui'
import { getUserData } from "~system/UserIdentity"
import { VideoScreenComponent, VoxelComponent } from './vox/components'
import { DCLConnect } from './dclconnect/dclconnect'
// import { GameController } from './vox/server'

executeTask(async function () {
  // Theoretically all of these should fire from the VoxelManager.init
  // However there are quite a lot of circular dependencies if we try to do that right now

  VoxelFloor.create(Vector3.Zero(), Vector3.create(16*2,0,16*2))
  VoxelCursor.init()
  VoxelManager.init()

  // VoxelManager.setId(2, 2, 2, 1)
  // const gc = new GameController()
  // ReactEcsRenderer.setUiRenderer(ui) 
})
