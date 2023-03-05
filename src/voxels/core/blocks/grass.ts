import { engine, Schemas } from "@dcl/sdk/ecs"
import { VoxelBlock } from "../classes"
import { BlockDisplaySettings, VoxelBehavior } from "../interfaces"

const display: BlockDisplaySettings = {
  name: "Grass",
  blockId: 1
}

const behavior: VoxelBehavior = {
  health: 100
}

export class Block_Grass extends VoxelBlock {
  public label: string = "Grass"
  public display: BlockDisplaySettings = display
  public behavior: VoxelBehavior = behavior
  onDestroy(){
    // play break animation
    // play break sound
    // remove xyz from voxelManager
    // create pickup grass tile
  }
  onClick(): void {
    // reduce health
    // change model shape
  }
}
