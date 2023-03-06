import { getPath } from "./helpers"
import { Voxel, VoxelBlock } from "./classes"
import { VoxelType } from "./enums"
import { GltfContainer, MapComponentDefinition, MapResult, pointerEventsSystem, Transform } from "@dcl/sdk/ecs"

class VoxelManagerInstance {
  public voxels: Map<string, Voxel> = new Map()
  constructor(){
    // forEachGrid(Vector3.create(0, 0, 0), Vector3.create(16*2, 16, 16*2), (x: number, y: number, z: number) => {
    //   this.setVoxel(new VoxelPlaceholder(x, y, z,VoxelType.NULL))
    // })
  }

  connect(url: string){
    // Connects to custom (self-hosted) DCLConnect WS server
  }

  simulateIncomingPayloadFromZoo(payload: []){
    // this.setVoxel()
  }

  getNeighbors(x: number, y: number, z: number, radius: number = 1){
    const path = getPath(x,y,z)
    if(this.voxels.has(path)){
      return []
    }
  }

  setVoxel(voxel: Voxel){
    const { x, y, z, type } = voxel
    switch(type){
      case VoxelType.BLOCK: this.setBlock(voxel as VoxelBlock); break;
      default: break;
    }
    this.voxels.set(`${x},${y},${z}`, voxel)

  }

  private setBlock(voxel: VoxelBlock){
    const { display, behavior, entity, x, y, z } = voxel as VoxelBlock
    const { state, onClick, onHoverEnter, onHoverExit, onDestroy, onEnter, onExit, components } = behavior
    const { name, modelSrc } = display
    GltfContainer.createOrReplace(entity, { src: modelSrc })
    components?.forEach((component:MapComponentDefinition<MapResult<any>>) => {
      console.log(component)
      component.create(entity)
    })
    Transform.createOrReplace(entity, { position: {x, y, z}})
    if(onClick) pointerEventsSystem.onPointerDown(entity, () => onClick(entity, behavior))
  }
}

export const VoxelManager = new VoxelManagerInstance()