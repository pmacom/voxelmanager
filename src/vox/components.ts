import { engine, Schemas } from '@dcl/sdk/ecs'

export const VoxelSelectorComponent = engine.defineComponent('VoxelSelectorComponent', {})

export const FloorTileComponent = engine.defineComponent('FloorTileComponent', {
  x: Schemas.Number,
  y: Schemas.Number,
  z: Schemas.Number
})

export const VoxelComponent = engine.defineComponent('VoxelComponent', {
  x: Schemas.Number,
  y: Schemas.Number,
  z: Schemas.Number,
  tileSetId: Schemas.Number,
  tileSetType: Schemas.Number,
  entityId: Schemas.Entity
})

export const VideoScreenComponent = engine.defineComponent('VideoScreenComponent', {
  src: Schemas.String,
  playing: Schemas.Boolean,
  muted: Schemas.Boolean,
  startAt: Schemas.String
})

export const DCLConnectSync = engine.defineComponent('DCLConnectSync', {
  components: Schemas.Array(Schemas.String)
})

