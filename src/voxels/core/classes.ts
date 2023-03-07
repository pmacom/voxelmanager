import { engine, Entity, MapComponentDefinition, MapResult, Schemas } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { VoxelBehaviorActions, VoxelType } from './enums'
import { forEachGrid } from './helpers'
import { BlockDisplaySettings, TileDisplaySettings, VoxelBehavior } from './interfaces'

export abstract class Voxel {
  abstract type: VoxelType
  abstract display: BlockDisplaySettings | TileDisplaySettings
  abstract behavior: Partial<VoxelBehavior>
  abstract entity: Entity
  abstract x: number
  abstract y: number
  abstract z: number
}

export abstract class VoxelTile implements Voxel {
  public abstract label?: string
  public abstract display: TileDisplaySettings
  public abstract behavior: VoxelBehavior
  public type: VoxelType = VoxelType.TILE
  public entity: Entity = engine.addEntity()

  constructor(public x: number, public y: number, public z: number) {}

  abstract updateShape?(): number
  _updateShape() { if (this.updateShape) this.updateShape() }

}

export abstract class VoxelBlock implements Voxel {
  public abstract display: BlockDisplaySettings
  public abstract behavior: VoxelBehavior
  public type: VoxelType = VoxelType.BLOCK
  public entity: Entity = engine.addEntity()
  constructor(public x: number, public y: number, public z: number) {}
}

export abstract class DCLConnectEntity {
  public entity: Entity = engine.addEntity()
}
