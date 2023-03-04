// TODO: Rename a lot of these types so they are more rational. It's a bit confusing to know when/how to use one.

import { TileData, VoxelTileType } from "./tiles/interfaces"



export enum TileConditions {
  NULL,
  IsAnyTile,
  IsSameTileId,
  IsEmpty,
  IsEmptyOrOther,

  IsFloorPlan,
  IsExterior,
  IsInterior,
  IsFloor,
  IsGround,
  IsWindow,
  IsDoorway
}

export interface TileMatchmakerResult {
  rotation: number
  strength: number | undefined
  tileIndex: number
}

// export interface TileSet {
//   name: string
//   type: VoxelTileType
//   tiles: Partial<TileData>[]
// }

export interface VoxelComponentSettings {
  x: number
  y: number
  z: number
  tileSetId: number
  entityId: number
}

export interface VoxelNeighbors {
  above: VoxelComponentSettings[]
  same: VoxelComponentSettings[]
  below: VoxelComponentSettings[]
  flattened: VoxelComponentSettings[]
}

export enum VoxelSelectorSides {
  TOP,
  BOTTOM,
  WEST,
  EAST,
  NORTH,
  SOUTH
}

export enum QuadTilePosition {
  TOP_LEFT,
  TOP_RIGHT,
  BOTTOM_LEFT,
  BOTTOM_RIGHT
}

export enum AppMode {
  NULL, // VIEW
  EDIT,
}

export enum EditVoxelType {
  BLOCK,
  TILE,
}