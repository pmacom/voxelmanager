import { engine, Schemas } from "@dcl/sdk/ecs"
import { VoxelBlock } from "../classes"
import { BlockDisplaySettings, VoxelBehavior } from "../interfaces"

const display: BlockDisplaySettings = {
  name: "TNT",
  blockId: 2
}

const behavior: VoxelBehavior = {
  health: 100
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
