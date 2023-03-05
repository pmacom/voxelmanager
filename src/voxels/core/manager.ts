import { getPath } from "./helpers"
import { Voxel } from "./classes"

class VoxelManagerInstance {
  public voxels: Map<string, Voxel> = new Map()
  constructor(){
    // forEachGrid(Vector3.create(0, 0, 0), Vector3.create(16*2, 16, 16*2), (x: number, y: number, z: number) => {
    //   this.setVoxel(new VoxelPlaceholder(x, y, z,VoxelType.NULL))
    // })
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
    const { x, y, z } = voxel
    this.voxels.set(`${x},${y},${z}`, voxel)
  }
}

export const VoxelManager = new VoxelManagerInstance()