import {
  engine,
  Entity,
  Material,
  MeshRenderer,
  PBMaterial_PbrMaterial,
  Transform,
} from '@dcl/sdk/ecs'
import { Color4, Quaternion } from '@dcl/sdk/math'
import { Materialize } from '../dash/materialize'
import { Dash_UV_QuadTile_Mappings } from '../dash/uvs'
import { QuadTilePosition, VoxelSelectorSides } from './interfaces'


const scale = 0.99
const transforms: Map<VoxelSelectorSides, { position: { x: number; y: number; z: number }; rotation: Quaternion }> =
  new Map([
    [
      VoxelSelectorSides.TOP,
      { position: { x: 0, y: 0.5 * scale, z: 0 }, rotation: Quaternion.fromEulerDegrees(90, 0, 0) }
    ],
    [
      VoxelSelectorSides.BOTTOM,
      { position: { x: 0, y: -0.5 * scale, z: 0 }, rotation: Quaternion.fromEulerDegrees(90, 0, 0) }
    ],
    [
      VoxelSelectorSides.WEST,
      { position: { x: 0, y: 0, z: -0.5 * scale }, rotation: Quaternion.fromEulerDegrees(0, 0, 90) }
    ],
    [
      VoxelSelectorSides.EAST,
      { position: { x: 0, y: 0, z: 0.5 * scale }, rotation: Quaternion.fromEulerDegrees(0, 0, 90) }
    ],
    [
      VoxelSelectorSides.NORTH,
      { position: { x: -0.5 * scale, y: 0, z: 0 }, rotation: Quaternion.fromEulerDegrees(0, 90, 90) }
    ],
    [
      VoxelSelectorSides.SOUTH,
      { position: { x: 0.5 * scale, y: 0, z: 0 }, rotation: Quaternion.fromEulerDegrees(0, 90, 90) }
    ]
])

class VoxelCursorInstance {
  private entity: Entity = engine.addEntity()

  private ids: Map<VoxelSelectorSides, QuadTilePosition> = new Map([
    [VoxelSelectorSides.TOP, QuadTilePosition.TOP_LEFT],
    [VoxelSelectorSides.BOTTOM, QuadTilePosition.TOP_RIGHT],
    [VoxelSelectorSides.WEST, QuadTilePosition.TOP_LEFT],
    [VoxelSelectorSides.EAST, QuadTilePosition.TOP_LEFT],
    [VoxelSelectorSides.NORTH, QuadTilePosition.TOP_LEFT],
    [VoxelSelectorSides.SOUTH, QuadTilePosition.TOP_LEFT]
  ])
  private VoxelSelectorSides: Map<VoxelSelectorSides, Entity> = new Map([
    [VoxelSelectorSides.TOP, engine.addEntity()],
    [VoxelSelectorSides.BOTTOM, engine.addEntity()],
    [VoxelSelectorSides.WEST, engine.addEntity()],
    [VoxelSelectorSides.EAST, engine.addEntity()],
    [VoxelSelectorSides.NORTH, engine.addEntity()],
    [VoxelSelectorSides.SOUTH, engine.addEntity()]
  ])

  private texture: PBMaterial_PbrMaterial = Materialize.hologramTexture(
    'textures/voxel-selector-diffuse.png',
    undefined,
    5
  )

  constructor() {
    Transform.create(this.entity, { position: { x: 1, y: 2, z: 1 } })
    MeshRenderer.setBox(this.entity)
    const color = Color4.create(0.5, 1, 0.5, 0.2)
    Material.setPbrMaterial(this.entity, {
      albedoColor: color,
      emissiveColor: color,
      specularIntensity: 3,
      metallic: 1,
      roughness: 1,
      glossiness: 2,
      reflectivityColor: color,
      emissiveIntensity: 0.1
    })

    this.VoxelSelectorSides.forEach((entity: Entity, side: VoxelSelectorSides) => {
      Transform.create(entity, { parent: this.entity, ...transforms.get(side)! })
      Material.setPbrMaterial(entity, this.texture)
      this.updateUVs()
    })
  }

  init(){
    // Nothing here yet, but it's mostly here to jumpstart the constructor right now.
  }

  getSideUVs(side: VoxelSelectorSides) {
    return [
      ...Dash_UV_QuadTile_Mappings[this.ids.get(side)!][1], // Front
      ...Dash_UV_QuadTile_Mappings[this.ids.get(side)!][0] // Back
    ]
  }

  updateUVs() {
    this.VoxelSelectorSides.forEach((entity: Entity, side: VoxelSelectorSides) => {
      MeshRenderer.setPlane(entity, this.getSideUVs(side))
    })
  }

  setActive(activeSide: VoxelSelectorSides) {
    this.ids.forEach((tilePosition: QuadTilePosition, side: VoxelSelectorSides) => {
      this.ids.set(side, side == activeSide ? 1 : 0)
    })
    this.updateUVs()
  }

  setPosition(x: number, y: number, z: number, setActiveId?: VoxelSelectorSides | undefined) {
    const transform = Transform.getMutable(this.entity)
    transform.position = { x: Math.round(x) + 0.5, y: Math.round(y) + 0.5, z: Math.round(z) + 0.5 }
    if (setActiveId) {
      this.setActive(setActiveId)
    }
  }
}

export const VoxelCursor = new VoxelCursorInstance()
