import { engine, Entity, MapComponentDefinition, MapResult, Schemas } from "@dcl/sdk/ecs"
import { Vector3 } from "@dcl/sdk/math"
import { forEachGrid } from "./helpers"

export enum VoxelType {
  NULL,
  BLOCK,
  TILE,
  ZONE,
}

export enum VoxelBehaviorActions {
  NULL,
  INDESTRUCTABLE,
  FIRE_DAMAGE_1,
  FIRE_DAMAGE_2,
  FIRE_DAMAGE_3,
  PASSTHROUGH
}

export abstract class VoxelBehavior {
  public indestructable: boolean = false
  public health: number = 100
  public actions: VoxelBehaviorActions[] = [
    VoxelBehaviorActions.INDESTRUCTABLE,
    VoxelBehaviorActions.FIRE_DAMAGE_2,
  ]
  public components: MapComponentDefinition<MapResult<any>>[] = []
  onClick?(): void
  onHoverEnter?(): void
  onHoverExit?(): void
  onDestroy?(): void
  onEnter?(): void
  onExit?(): void
}

interface TileDisplaySettings {
  name: string // human readable for the UI
  tileSetId: number // Wall[0], 1, 2, 3, 4, 5
  tileSetType: number // Wall, Floor, Exterior, Interior
}

interface BlockDisplaySettings {
  name: string // Brick, Grass, Sand, TNT, Bedrock, Flag
  blockId: number
}

export interface Voxel {
  type: VoxelType
  display: BlockDisplaySettings | TileDisplaySettings
  behvaior: VoxelBehavior
  entity: Entity
  x: number
  y: number
  z: number
}

export class VoxelPlaceholder implements Voxel {
  constructor(
    public x: number,
    public y: number,
    public z: number,
    public type: VoxelType
  ){

  }
}

const getPath = (x: number, y: number, z: number) => `${x},${y},${z}`
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




/**
 * Factories
 */

  export class VoxelTile implements Voxel {
    label?: string
    type: VoxelType = VoxelType.TILE
    constructor(
      public x: number,
      public y: number,
      public z: number){

    }
    updateShape?(): number
    _updateShape(){
      if(this.updateShape) this.updateShape()
    }
  }

  export class VoxelBlock implements Voxel {
    label?: string
    type: VoxelType = VoxelType.BLOCK
    indestructable: boolean = false
    health: number = 100
    inventoryImgSrc?: string

    constructor(
      public x: number,
      public y: number,
      public z: number){

    }
    onClick?(): void
    onHoverEnter?(): void
    onHoverExit?(): void
    onDestroy?(): void
  }

/**
 * TileSets
 */

export class TileSet_FloorPlan_Default extends VoxelTile {
    public label: string = "FloorPlan"
    public updateShape(): number {
      return 0
    }
  }

export class TileSet_Exterior_RedBricks extends VoxelTile {
    public label: string = "Red Bricks"
    public updateShape(): number {
      return 0
    }
  }

/**
 * Blocks
 */

export class Block_Grass extends VoxelBlock {
    public label: string = "Grass"
    public health: number = 50
    onDestroy(){
      // play break animation
      // play break sound
      // remove xyz from voxelManager
      // create pickup grass tile
    }
}

export class Block_Flag extends VoxelBlock {
  public label: string = "Flag"
  public indestructable: boolean = true
  public health: number = 0
  onDestroy(){
    // play break animation
    // play break sound
    // remove xyz from voxelManager
    // create pickup grass tile
  }
}

export class Block_Bedrock extends VoxelBlock {
    public label: string = "Bedrock"
    public health: number = 10000
    onDestroy(){
      // play break animation
      // play break sound
      // remove xyz from voxelManager
      // create pickup grass tile
    }
  }

  export const TNT = engine.defineComponent('TNT', {
    timer: Schemas.Number,
    triggered: Schemas.Boolean,
    damage: Schemas.Number,
    radius: Schemas.Number,
  })




  export class Block_TNT extends VoxelBlock {
    public label: string = "TNT"
    public health: number = 100
    public entity: Entity = engine.addEntity()
    public components = [
      TNT.create(this.entity),
    ]
    onDestroy(){

      // play break animation
      // play break sound
      // remove xyz from voxelManager
      // create pickup grass tile
    }
  }


















// export class TileSet_Behavior {
//   _findMatch(){
//     if(this.findMatch){ }
//     console.log('Finding the match - Default Behavior')
//   }
// }

// export abstract class TileSet_Settings extends TileSet_Behavior {
//   public abstract label: string
//   public abstract tileType: VoxelTileType
//   public abstract modelDirectoryPath: string
//   public abstract tiles: TileData[]
//   public abstract findMatch: ()=>void
// }


export enum VoxelTileType {
  DEFAULT,
  WALL,
  EXTERIOR,
  INTERIOR,
  FLOOR,
  GROUND,
  WINDOW,
  DOORWAY
}

export interface TileData {
  filename: string
  allowRotation: boolean
  above: number[][]
  same: number[][]
  below: number[][]
  flattened?: number[]
}