// import { engine, Entity, GltfContainer, MeshCollider, Schemas, Transform } from '@dcl/sdk/ecs'
// import { Quaternion, Vector3 } from '@dcl/sdk/math'
// import { TileData, VoxelComponentSettings, TileMatchmakerResult, VoxelNeighbors } from './interfaces'
// import { forEachGrid, GetAbove, GetBelow, GetSame, RotationMapping } from './utils/helpers'
// import { VoxelTileSets } from './tiles'
// import { getPath } from './utils/helpers'
// import { TileMatchmaker } from './utils/weights'
// import { VoxelComponent } from './components'

// class VoxelManagerInstance {
//   private voxels: Map<string, Entity> = new Map()
//   private neighbors: Map<string, VoxelNeighbors> = new Map()

//   public init() {
//     // Once all voxels are generated, we use this callback array to
//     // then itterate over each voxel and get it's neighboring voxels
//     // and store them in their own mapping (this.neighbors)
//     const callbacks: (() => void)[] = []

//     // Create a forloop for each xyz of a 16x16x16 grid (one parcel)
//     forEachGrid(Vector3.create(0, 0, 0), Vector3.create(16*2, 16, 16*2), (x: number, y: number, z: number) => {
//       const voxel = engine.addEntity()
//       const path = getPath(x, y, z)
//       const p = Vector3.add(Vector3.create(x, y, z), Vector3.create(0.5, 0.5, 0.5))
//       const s = 1

//       // Create the voxel entity
//       const component = VoxelComponent.create(voxel, {
//         x,
//         y,
//         z,
//        // tileSetId: 0,
//        // tileSetType: 0,
//         entityId: voxel
//       })

//       Transform.create(voxel, {
//         position: { x: p.x, y: p.y, z: p.z },
//         scale: { x: s, y: s, z: s }
//       })

//       // Generate the callback that gets it's neighbors AFTER all have been created
//       callbacks.push(() => {
//         const { x: _x, y: _y, z: _z } = component
//         const voxels: (VoxelComponentSettings | undefined)[] = []
//         const ids: (VoxelNeighbors | undefined)[] = []




//         // voxels.push(this.getMutableVoxelComponent(x+1, y+1, z-1))
//         // voxels.push(this.getMutableVoxelComponent(x+1, y+1, z))
//         // voxels.push(this.getMutableVoxelComponent(x+1, y+1, z+1))

//         // voxels.push(this.getMutableVoxelComponent(x, y+1, z-1))
//         // voxels.push(this.getMutableVoxelComponent(x, y+1, z))
//         // voxels.push(this.getMutableVoxelComponent(x, y+1, z+1))

//         // voxels.push(this.getMutableVoxelComponent(x-1, y+1, z-1))
//         // voxels.push(this.getMutableVoxelComponent(x-1, y+1, z))
//         // voxels.push(this.getMutableVoxelComponent(x-1, y+1, z+1))




//         // voxels.push(this.getMutableVoxelComponent(x+1, y, z-1))
//         // voxels.push(this.getMutableVoxelComponent(x+1, y, z))
//         // voxels.push(this.getMutableVoxelComponent(x+1, y, z+1))

//         // voxels.push(this.getMutableVoxelComponent(x, y, z-1))
//         // voxels.push(this.getMutableVoxelComponent(x, y, z))
//         // voxels.push(this.getMutableVoxelComponent(x, y, z+1))

//         // voxels.push(this.getMutableVoxelComponent(x-1, y, z-1))
//         // voxels.push(this.getMutableVoxelComponent(x-1, y, z))
//         // voxels.push(this.getMutableVoxelComponent(x-1, y, z+1))




//         // voxels.push(this.getMutableVoxelComponent(x+1, y-1, z-1))
//         // voxels.push(this.getMutableVoxelComponent(x+1, y-1, z))
//         // voxels.push(this.getMutableVoxelComponent(x+1, y-1, z+1))

//         // voxels.push(this.getMutableVoxelComponent(x, y-1, z-1))
//         // voxels.push(this.getMutableVoxelComponent(x, y-1, z))
//         // voxels.push(this.getMutableVoxelComponent(x, y-1, z+1))

//         // voxels.push(this.getMutableVoxelComponent(x-1, y-1, z-1))
//         // voxels.push(this.getMutableVoxelComponent(x-1, y-1, z))
//         // voxels.push(this.getMutableVoxelComponent(x-1, y-1, z+1))


//         // Set the neighbors
//         this.neighbors.set(path, { flattened: voxels } as VoxelNeighbors)
//       })

//       // Set the voxel
//       this.voxels.set(getPath(x, y, z), voxel)
//     })
//     callbacks.forEach((callback) => callback())

//     // forEachGrid(Vector3.create(0, 0, 0), Vector3.create(16*2, 16, 16*2), (x: number, y: number, z: number) => {
//     //   if(Math.random()>.8) this.setId(x,y,z,1)
//     // })
//   }

//   setMeshCollider(entity: Entity, useCollider: boolean){
//     if(!entity) return
//     if(useCollider){
//       MeshCollider.setBox(entity)
//     }else{
//       MeshCollider.deleteFrom(entity)
//     }
//   }

//   getVoxel(x: number, y: number, z: number): Entity | undefined {
//     const path = getPath(x, y, z)
//     const voxel = this.voxels.get(path)
//     return voxel
//   }

//   getNeighbors(x: number, y: number, z: number): VoxelNeighbors | undefined {
//     const path = getPath(x, y, z)
//     const neighbors = this.neighbors.get(path)
//     return neighbors
//   }

//   setVoxel(x: number, y: number, z: number, voxelType: number, voxelSetId: number, voxelTypeId: number){
//     const voxelComponent = this.getMutableVoxelComponent(x, y, z)
//     // if (!voxelComponent || voxelComponent.tileSetId == tileSetId) return // If they are already the same, drop out
//     // const tileSet = VoxelTileSets[tileSetId]
//     // if (!tileSet) return
//     // voxelComponent.tileSetId = tileSetId
//     // voxelComponent.tileSetType = tileSet.type
//     // this.updateVoxel(voxelComponent)
//   }

//   setId(x: number, y: number, z: number, tileSetId: number) {
//     const voxelComponent = this.getMutableVoxelComponent(x, y, z)
//     // if (!voxelComponent || voxelComponent.tileSetId == tileSetId) return // If they are already the same, drop out
//     // const tileSet = VoxelTileSets[tileSetId]
//     // if (!tileSet) return
//     // voxelComponent.tileSetId = tileSetId
//     // voxelComponent.tileSetType = tileSet.type
//     // this.updateVoxel(voxelComponent)
//   }

//   private getMutableVoxelComponent(x: number, y: number, z: number) {
//     const voxel = this.getVoxel(x, y, z)
//     if (!voxel) return
//     return VoxelComponent.getMutable(voxel)
//   }

//   private updateVoxel(voxel: VoxelComponentSettings, skipNeighborCheck: boolean = false) {
//     const { x, y, z, tileSetId, entityId } = voxel
//     const path = getPath(x, y, z)
//     const tileSet = VoxelTileSets[tileSetId]
//     if (!tileSet) return
//     const { tiles } = tileSet
//     const neighbors = this.neighbors.get(path)
//     if (!neighbors) return
//     const { flattened } = neighbors
//     const neighborIdsFlattened = flattened.map((item) => (item && item.tileSetId ? item.tileSetId : 0))

//     let bestMatch: TileMatchmakerResult = { rotation: 0, strength: -1, tileIndex: 0 }
//     tiles.forEach((tile: Partial<TileData>, tileIndex: number) => {
//       const { flattened: conditionIdsFlattened, model } = tile
//       if (!conditionIdsFlattened || !model) return
//       const matchData = TileMatchmaker(neighborIdsFlattened, conditionIdsFlattened, tileIndex, tileSetId)
//       const { strength, tileIndex: tileId } = matchData
//       if (!bestMatch || !bestMatch.strength || !strength || !matchData.strength) return
//       if (bestMatch.strength < matchData.strength) bestMatch = matchData
//     })

//     const src = tileSet.tiles[bestMatch.tileIndex].model

//     if (src) {
//       Transform.getMutable(voxel.entityId as Entity).rotation = Quaternion.fromEulerDegrees(0, RotationMapping[bestMatch.rotation] as number, 0)
//       GltfContainer.createOrReplace(entityId as Entity, { src })
//       this.setMeshCollider(entityId as Entity, true)
//       if (neighbors && !skipNeighborCheck) {
//         neighbors.flattened.forEach((neighbor: VoxelComponentSettings, index: number) => {
//           if (!neighbor || index == 13) return // Ignore yourself (befo yo wrek yosef)
//           const { tileSetId, x, y, z } = neighbor
//           if (tileSetId !== 0) {
//             const neighborVoxel = this.getMutableVoxelComponent(x, y, z)
//            // if (neighborVoxel) this.updateVoxel(neighborVoxel, true)
//           }
//         })
//       }
//     }
//   }
// }

// export const VoxelManager = new VoxelManagerInstance()
