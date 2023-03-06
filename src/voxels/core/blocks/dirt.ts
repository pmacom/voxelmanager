import { engine, Entity, GltfContainer, Schemas } from "@dcl/sdk/ecs"
import { VoxelBlock } from "../classes"
import { BlockDisplaySettings, VoxelBehavior } from "../interfaces"

const stateName = 'VoxelManager:Block_Dirt_State'
const stateSchema = { health: Schemas.Number }
const stateDefault = { health: 100 }

export const Block_Dirt_State = engine.defineComponent(stateName, stateSchema, stateDefault)

const display: BlockDisplaySettings = {
  name: "Dirt",
  modelSrc: 'models/blocks/dirt.glb'
}

const behavior: VoxelBehavior = {
  components: [Block_Dirt_State],
  onClick: (entity: Entity, behavior: VoxelBehavior) => {
    const state = Block_Dirt_State.getMutableOrNull(entity)
    const { onDestroy } = behavior
    if(state){
      if(state.health > 0){
        state.health-=10
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