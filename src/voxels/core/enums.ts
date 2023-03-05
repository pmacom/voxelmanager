export enum VoxelType {
  NULL,
  BLOCK,
  TILE,
  ZONE,
}

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

export enum VoxelBehaviorActions {
  NULL,
  INDESTRUCTABLE,
  FIRE_DAMAGE_1,
  FIRE_DAMAGE_2,
  FIRE_DAMAGE_3,
  PASSTHROUGH
}