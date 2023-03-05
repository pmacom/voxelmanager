import { MapComponentDefinition, MapResult } from "@dcl/sdk/ecs"
import { VoxelBehaviorActions } from "./enums"

export interface TileDisplaySettings {
  name: string // human readable for the UI
  tileSetId: number // Wall[0], 1, 2, 3, 4, 5
  tileSetType: number // Wall, Floor, Exterior, Interior
  thumbnail: string // relative path or url for the UI image
}

export interface BlockDisplaySettings {
  name: string // Brick, Grass, Sand, TNT, Bedrock, Flag
  blockId: number
}

export interface VoxelBehavior {
  indestructable?: boolean
  health?: number
  actions?: VoxelBehaviorActions[]
  components?: MapComponentDefinition<MapResult<any>>[]
  onClick?(): void
  onHoverEnter?(): void
  onHoverExit?(): void
  onDestroy?(): void
  onEnter?(): void
  onExit?(): void
}