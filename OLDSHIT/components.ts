import { engine, Schemas } from '@dcl/sdk/ecs'

export const VoxelSelectorComponent = engine.defineComponent('VoxelSelectorComponent', {})

export const GroundTileComponent = engine.defineComponent('GroundTileComponent', {
  x: Schemas.Number,
  y: Schemas.Number,
  z: Schemas.Number
})

export const VoxelComponent = engine.defineComponent('VoxelComponent', {
  x: Schemas.Number,
  y: Schemas.Number,
  z: Schemas.Number,
  entityId: Schemas.Entity
})

export const VoxelTypeComponent = engine.defineComponent('VoxelTileComponent', {
  voxelType: Schemas.Number,
  voxelSetId: Schemas.Number,
  voxelTypeId: Schemas.Number,
})
