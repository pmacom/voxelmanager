import { AudioSource, engine, Entity, GltfContainer, Schemas, Transform } from "@dcl/sdk/ecs"
import { Audio_PlayOnce, Audio_PlayOnce_Random } from "../audio/playSound"
import { VoxelBlock } from "../classes"
import { VoxelBehaviorActions, VoxelType } from "../enums"
import { BlockDisplaySettings, VoxelBehavior } from "../interfaces"

const stateName = 'VoxelManager::Block_Coin_State'
const stateSchema = {
  value: Schemas.Number,
}

const stateDefault = {
  value: 10,
}

export const Block_Coin_State = engine.defineComponent(stateName, stateSchema, stateDefault)

const display: BlockDisplaySettings = {
  displayName: "Coin",
  modelSrc: 'models/blocks/coin.glb',
  thumbnail: 'images/thumbnails/blocks/coin.png',
}

const playerState = { wallet: 0 }

const behavior: VoxelBehavior = {
  components: [Block_Coin_State, Transform, GltfContainer, AudioSource], // Components on this voxel to sync
  // actions: [
  //   VoxelBehaviorActions.COLLECTABLE,
  // ],
  onClick: (entity: Entity, behavior: VoxelBehavior) => {

  },
  onEnter: (entity: Entity, behavior: VoxelBehavior) => {
    const state = Block_Coin_State.getMutableOrNull(entity)
    const { onDestroy } = behavior

    // Send a message to the server requesting to pick it up
        // What are we sending to the server?
          // Send the coin's uuid
        // What are we getting back? And how is it even secure?
    
    const server_side_knowledge_of_this_voxel = {
      uuid: 'coin-01',
      type: 'Block_Coin', // display, behavior
      state: {
        value: 10,
      }
    }
    
    const payload_sent_to_server = {
      uuid: 'coin-01',

    }

    // What do we know at this moment locally?
        // Player Eth Address, ClientId, SceneState (whats what), Permissions
    // What do we know on the server?
        // Ideally at this moment it knows that this coin is at 2,3,4

    

    if(state){
      playerState.wallet += state.value
      
      if(onDestroy) onDestroy(entity)
    }
  },
  onDestroy: (entity: Entity)=>{
    engine.removeEntity(entity)
  }
}





export class Block_Coin extends VoxelBlock {
  public label: string = "Coin"
  public display: BlockDisplaySettings = display
  public behavior: VoxelBehavior = behavior
}
