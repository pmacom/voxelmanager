import { executeTask } from '@dcl/sdk/ecs'
import { ReactEcsRenderer } from '@dcl/sdk/react-ecs'
import { Block_Dirt } from './voxels/core/blocks/dirt'
import { VoxelManager } from './voxels/core/manager'
import { ui } from './voxels/core/ui/ui'
export * from '@dcl/sdk' // export all the functions required to make the scene work

executeTask(async function(){
  // initialize VoxelManager with options for which server to connect to.
    // Init function does:
      // connects to dclconnect server to get current scene payload
      // loads each voxel into the scene
      // sets default AppMode to be `View`
  // Initialize UI

  VoxelManager.connect('http://localhost:3000')
  VoxelManager.setVoxel(new Block_Dirt(2,2,2))
  ReactEcsRenderer.setUiRenderer(ui)
})
