import { engine, Schemas } from "@dcl/sdk/ecs"
import { VoxelBlock } from "../classes"
import { BlockDisplaySettings, VoxelBehavior } from "../interfaces"

const display: BlockDisplaySettings = {
  displayName: "TNT",
  modelSrc: 'models/blocks/tnt.glb',
  thumbnail: 'images/thumbnails/blocks/dirt.png'
}

const behavior: VoxelBehavior = {
  state: { health: 100 },
}

export class Block_TNT extends VoxelBlock {
  public label: string = "TNT"
  public display: BlockDisplaySettings = display
  public behavior: VoxelBehavior = behavior
  onDestroy(){
    // play explosion animation
    // play explosion sound
    // remove own xyz from voxelManager
    // remove voxels in radius
  }
  onClick(): void {
    // reduce health
    // change model shape
  }
}
