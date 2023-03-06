import { Entity, MapComponentDefinition, MapResult } from "@dcl/sdk/ecs"
import { VoxelBehaviorActions } from "./enums"

export interface TileDisplaySettings {
  name: string // human readable for the UI
  tileSetId: number // Wall[0], 1, 2, 3, 4, 5
  tileSetType: number // Wall, Floor, Exterior, Interior
  thumbnail: string // relative path or url for the UI image
}

export interface BlockDisplaySettings {
  displayName: string // Brick, Grass, Sand, TNT, Bedrock, Flag
  modelSrc: string //
  thumbnail: string
}

export interface VoxelBehavior {
  state?: any // TODO: REMOVE
  actions?: VoxelBehaviorActions[]
  components?: MapComponentDefinition<MapResult<any>>[]
  onClick?(entity?: Entity, behavior?: VoxelBehavior): void
  onDestroy?(entity?: Entity, behavior?: VoxelBehavior): void
  onHoverEnter?(entity?: Entity, behavior?: VoxelBehavior): void
  onHoverExit?(entity?: Entity, behavior?: VoxelBehavior): void
  onDestroy?(entity?: Entity, behavior?: VoxelBehavior): void
  onEnter?(entity?: Entity, behavior?: VoxelBehavior): void
  onExit?(entity?: Entity, behavior?: VoxelBehavior): void
}