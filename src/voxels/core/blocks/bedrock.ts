import { engine, Schemas } from "@dcl/sdk/ecs"
import { VoxelBlock } from "../classes"
import { BlockDisplaySettings, VoxelBehavior } from "../interfaces"

const display: BlockDisplaySettings = {
  displayName: "Bedrock",
  modelSrc: 'models/blocks/bedrock.glb',
  thumbnail: 'images/thumbnails/blocks/bedrock.png'
}

const behavior: VoxelBehavior = {
  state: { health: 100 }
}

export class Block_Dirt extends VoxelBlock {
  public label: string = "Bedrock"
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
