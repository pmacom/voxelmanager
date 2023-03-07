import { getPath } from "./helpers"
import { Voxel, VoxelBlock, VoxelTile } from "./classes"
import { VoxelType } from "./enums"
import { GltfContainer, MapComponentDefinition, MapResult, pointerEventsSystem, Transform } from "@dcl/sdk/ecs"




class DCLConnectEntityManagerInstance {
  public entities: Map<string, Voxel> = new Map()
  addEntity(){

  }
}

export const EntityManager = new DCLConnectEntityManagerInstance()