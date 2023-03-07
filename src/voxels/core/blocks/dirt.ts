import { engine, Entity, GltfContainer, Schemas } from "@dcl/sdk/ecs"
import { Audio_PlayOnce, Audio_PlayOnce_Random } from "../audio/playSound"
import { VoxelBlock } from "../classes"
import { VoxelBehaviorActions } from "../enums"
import { BlockDisplaySettings, VoxelBehavior } from "../interfaces"

const stateName = 'VoxelManager::Block_Dirt_State'
const stateSchema = {
  timer: Schemas.Number,
  health: Schemas.Number,
  throttle: Schemas.Number,
  // decay: Schemas.Number, // how many seconds till it goes away
  // event: Schemas.String, // 'destroy',
  // timestamp: Schemas.Number, // 1
}

const stateDefault = {
  timer: 0,
  health: 100,
  throttle: 2,
  // decay: 99999999
}

export const Block_Dirt_State = engine.defineComponent(stateName, stateSchema, stateDefault)

const display: BlockDisplaySettings = {
  displayName: "Dirt",
  modelSrc: 'models/blocks/dirt.glb',
  thumbnail: 'images/thumbnails/blocks/dirt.png',
}

const behavior: VoxelBehavior = {
  components: [Block_Dirt_State],
  // actions: [
  //   VoxelBehaviorActions.COLLECTABLE,
  // ],
  onClick: (entity: Entity, behavior: VoxelBehavior) => {
    const state = Block_Dirt_State.getMutableOrNull(entity)
    const { onDestroy } = behavior
    if(state){
      if(state.health > 0){
        state.health-=25
        Audio_PlayOnce_Random([
          'sounds/dig/grass1.mp3',
          'sounds/dig/grass2.mp3',
          'sounds/dig/grass3.mp3',
          'sounds/dig/grass4.mp3',
        ])
        console.log('TAKING DAMAGE', state.health)
        if(state.health <= 0 && onDestroy) onDestroy(entity)
      }
    }
  },
  onDestroy: (entity: Entity)=>{
    console.log('SHOULD DESTROY', entity)
    engine.removeEntity(entity)
  }
}

export class Block_Dirt extends VoxelBlock {
  public label: string = "Grass"
  public display: BlockDisplaySettings = display
  public behavior: VoxelBehavior = behavior
}
