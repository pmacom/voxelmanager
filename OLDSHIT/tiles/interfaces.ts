enum VoxelType {
  BLOCK,
  TILE,
}

interface Voxel {
  type: VoxelType
  x: number
  y: number
  z: number
}

class VoxelManagerInstance {
  setVoxel(x: number, y:number, z:number){}
}

const VoxelManager = new VoxelManagerInstance()




/**
 * Factories
 */

  class VoxelTile implements Voxel {
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

  class VoxelBlock implements Voxel {
    label?: string
    type: VoxelType = VoxelType.BLOCK
    health: number = 100

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

  class TileSet_FloorPlan_Default extends VoxelTile {
    public label: string = "FloorPlan"
    public updateShape(): number {
      return 0
    }
  }

  class TileSet_Exterior_RedBricks extends VoxelTile {
    public label: string = "Red Bricks"
    public updateShape(): number {
      return 0
    }
  }

/**
 * Blocks
 */

  class Block_Grass extends VoxelBlock {
    public label: string = "Grass"
    public health: number = 50
    onDestroy(){
      // play break animation
      // play break sound
      // remove xyz from voxelManager
      // create pickup grass tile
    }
  }

  class Block_Bedrock extends VoxelBlock {
    public label: string = "Bedrock"
    public health: number = 10000
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