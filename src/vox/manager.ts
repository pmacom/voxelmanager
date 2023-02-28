import { engine, Entity, GltfContainer, MeshCollider, Schemas, Transform } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { TileData, VoxelComponentSettings, VoxelMatchmakerResult, VoxelNeighbors } from './interfaces'
import { forEachGrid, GetAbove, GetBelow, GetSame } from './utils/helpers'
import { VoxelTileSets } from './tiles'
import { getPath } from './utils/helpers'
import { VoxelMatchmaker } from './utils/weights'

export const VoxelComponent = engine.defineComponent('VoxelComponent', {
  x: Schemas.Number,
  y: Schemas.Number,
  z: Schemas.Number,
  tileSetId: Schemas.Number,
  tileSetType: Schemas.Number,
  entityId: Schemas.Entity
})

class VoxelManagerInstance {
  private voxels: Map<string, Entity> = new Map()
  private neighbors: Map<string, VoxelNeighbors> = new Map()

  public init() {
    // Once all voxels are generated, we use this callback array to
    // then itterate over each voxel and get it's neighboring voxels
    // and store them in their own mapping (this.neighbors)
    const callbacks: (() => void)[] = []

    // Create a forloop for each xyz of a 16x16x16 grid (one parcel)
    forEachGrid(Vector3.create(0, 0, 0), Vector3.create(16, 16, 16), (x: number, y: number, z: number) => {
      const voxel = engine.addEntity()
      const path = getPath(x, y, z)
      const p = Vector3.add(Vector3.create(x, y, z), Vector3.create(0.5, 0.5, 0.5))
      const s = 1

      // Create the voxel entity
      const component = VoxelComponent.create(voxel, {
        x,
        y,
        z,
        tileSetId: 0,
        tileSetType: 0,
        entityId: voxel
      })

      Transform.create(voxel, {
        position: { x: p.x, y: p.y, z: p.z },
        scale: { x: s, y: s, z: s }
      })

      // Generate the callback that gets it's neighbors AFTER all have been created
      callbacks.push(() => {
        const { x: _x, y: _y, z: _z } = component
        const voxels: (VoxelComponentSettings | undefined)[] = []
        const ids: (VoxelNeighbors | undefined)[] = []

        // Get the neighboring voxels if they exist. Push them (if any) into the array
        forEachGrid({ x: x - 1, y: y - 1, z: z - 1 }, { x: x + 1, y: y + 1, z: z + 1 }, (x: number, y: number, z: number) => {
          voxels.push(this.getMutableVoxelComponent(x, y, z))
        })

        // Slice the array to grab each layer
        const above = GetAbove(voxels)
        const same = GetSame(voxels)
        const below = GetBelow(voxels)

        // Set the neighbors
        this.neighbors.set(path, { above, same, below, flattened: voxels } as VoxelNeighbors)
      })

      // Set the voxel
      this.voxels.set(getPath(x, y, z), voxel)
    })
    callbacks.forEach((callback) => callback())
  }

  getVoxel(x: number, y: number, z: number): Entity | undefined {
    const path = getPath(x, y, z)
    const voxel = this.voxels.get(path)
    return voxel
  }

  getNeighbors(x: number, y: number, z: number): VoxelNeighbors | undefined {
    const path = getPath(x, y, z)
    const neighbors = this.neighbors.get(path)
    return neighbors
  }

  setId(x: number, y: number, z: number, tileSetId: number) {
    const voxelComponent = this.getMutableVoxelComponent(x, y, z)
    // console.log('VOX7 - Creating a voxel with id', voxelComponent?.entityId, { x, y, z })
    if (!voxelComponent || voxelComponent.tileSetId == tileSetId) return // If they are already the same, drop out
    const tileSet = VoxelTileSets[tileSetId]
    if (!tileSet) return
    voxelComponent.tileSetId = tileSetId
    voxelComponent.tileSetType = tileSet.type
    this.updateVoxel(voxelComponent)
  }

  private getMutableVoxelComponent(x: number, y: number, z: number) {
    const voxel = this.getVoxel(x, y, z)
    if (!voxel) return
    return VoxelComponent.getMutable(voxel)
  }

  private updateVoxel(voxel: VoxelComponentSettings, initiator?: Entity) {
    // console.log('Updating a voxel', voxel, initiator)
    const { x, y, z, tileSetId, entityId } = voxel
    const path = getPath(x, y, z)
    const tileSet = VoxelTileSets[tileSetId]
    if (!tileSet) return
    const { tiles } = tileSet
    const neighbors = this.neighbors.get(path)
    if (!neighbors) return
    const { flattened } = neighbors
    const neighborIdsFlattened = flattened.map((item) => (item && item.tileSetId ? item.tileSetId : 0))
    if (initiator == entityId) return

    let bestMatch: VoxelMatchmakerResult = { rotationIndex: 0, strength: -1, tileIndex: 0 }
    tiles.forEach((tile: Partial<TileData>, tileIndex: number) => {
      const { flattened: conditionIdsFlattened, model } = tile
      if (!conditionIdsFlattened || !model) return
      const matchData = VoxelMatchmaker(neighborIdsFlattened, conditionIdsFlattened, tileIndex, tileSetId)
      const { strength, tileIndex: tileId } = matchData
      if (!bestMatch || !bestMatch.strength || !strength || !matchData.strength) return
      if (bestMatch.strength < matchData.strength) {
        bestMatch = matchData
        // console.log('Found a new best match', matchData)
      }
    })

    let rotation = 0
    switch (bestMatch.rotationIndex) {
      case 1:
        rotation = 0
        break
      case 2:
        rotation = 0
        break
      case 3:
        rotation = 0
        break
      case 0:
      default:
        break
    }
    Transform.getMutable(voxel.entityId as Entity).rotation = Quaternion.fromEulerDegrees(0, rotation, 0)

    const src = tileSet.tiles[bestMatch.tileIndex].model
    if (src) {
      GltfContainer.createOrReplace(entityId as Entity, { src })
      MeshCollider.setBox(entityId as Entity)
      if (neighbors) {
        neighbors.flattened.forEach((neighbor: VoxelComponentSettings, index: number) => {
          if (!neighbor || index == 13) return // Ignore yourself
          const { tileSetId, x, y, z } = neighbor
          if (tileSetId !== 0) {
            const neighborVoxel = this.getMutableVoxelComponent(neighbor.x, neighbor.y, neighbor.z)
            if (neighborVoxel) this.updateVoxel(neighborVoxel, initiator ? initiator : neighborVoxel.entityId)
          }
        })
      }
    }
  }
}

export const VoxelManager = new VoxelManagerInstance()
