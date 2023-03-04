import { engine, Schemas } from '@dcl/sdk/ecs'

export const VoxelSelectorComponent = engine.defineComponent('VoxelSelectorComponent', {})

export const GroundTileComponent = engine.defineComponent('GroundTileComponent', {
  x: Schemas.Number,
  y: Schemas.Number,
  z: Schemas.Number
})

export const VoxelTileComponent = engine.defineComponent('VoxelTileComponent', {
  x: Schemas.Number,
  y: Schemas.Number,
  z: Schemas.Number,
  tileSetId: Schemas.Number,
  tileSetType: Schemas.Number,
  entityId: Schemas.Entity
})
