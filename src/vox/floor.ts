import { CameraMode, DeepReadonlyObject, engine, Entity, InputAction, inputSystem, Material, MeshCollider, MeshRenderer, PBMaterial_PbrMaterial, PBPointerEventsResult, PBRaycastResult, PointerEvents, PointerEventsResult, pointerEventsSystem, PointerEventType, Raycast, RaycastHit, RaycastQueryType, RaycastResult, Schemas, Transform } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { Materialize } from '../dash/materialize'
import { Dash_UV_QuadTile_Mappings } from '../dash/uvs'
import { FloorTileComponent, VoxelComponent, VoxelSelectorComponent } from './components'
import { VoxelCursor } from './cursor'
import { AppMode, VoxelSelectorSides } from './interfaces'
import { VoxelManager } from './manager'

const s = 1 // 0.95
class VoxelFloorInstance {
  private testEntity: Entity = engine.addEntity()
  private floorTiles: Entity[] = []
  private timer: number = 0
  private updateInterval: number = .01
  private mode: AppMode = AppMode.EDIT

  private texture: PBMaterial_PbrMaterial = Materialize.hologramTexture(
    'textures/voxel-selector-diffuse.png',
    undefined,
    5
  )

  constructor(){
    engine.addSystem(this.system.bind(this))
  }

  create(start: Vector3, end: Vector3) {
    for (let x = start.x; x < end.x; x++) {
      for (let z = start.z; z < end.z; z++) {

        // Create a floor tile for every x,z on the ground floor
        const floorTile = engine.addEntity()
        Transform.create(floorTile, {
          position: { x: x + 0.5, y: 0, z: z + 0.5 },
          rotation: Quaternion.fromEulerDegrees(90, 0, 0),
          scale: { x: s, y: s, z: s }
        })
        MeshCollider.setPlane(floorTile)
        // MeshRenderer.setPlane(floorTile, [...Dash_UV_QuadTile_Mappings[2][0], ...Dash_UV_QuadTile_Mappings[2][1]])
        // Material.setPbrMaterial(floorTile, this.texture)
        FloorTileComponent.create(floorTile, { x, y: 0, z})

        // Set Click Event
        // TODO: Replace this with a more dynamic setting. More buttons?
        pointerEventsSystem.onPointerDown(
          floorTile,
          function () {
            VoxelManager.setId(x, 0, z, 1)
          },
          {
            button: InputAction.IA_PRIMARY,
            hoverText: 'Add'
          }
        )

        this.floorTiles.push(floorTile)
      }
    }
  }

  system(dt: number){
    // Throttle the update so it doesn't happen every frame
    this.timer = this.timer+dt
    if(this.timer <= this.updateInterval || this.mode !== AppMode.EDIT) return
    this.timer = 0;

    // TODO: Fix this hack. Nico said you can just get the hit event from MeshRenderer
    const cameraTransform = Transform.get(engine.CameraEntity)
    Raycast.createOrReplace(engine.CameraEntity, {
      maxDistance: 100,
      queryType: RaycastQueryType.RQT_HIT_FIRST,
      direction: Vector3.rotate(Vector3.Forward(), cameraTransform.rotation),
      origin: cameraTransform.position
    })

    const raycastResults = engine.getEntitiesWith(RaycastResult, CameraMode)
    for (const [entity] of raycastResults) {
      const result = RaycastResult.get(entity)
      if(result.hits[0]){
        const { entityId } = result.hits[0]
        if(!entityId) return
        if(FloorTileComponent.has(entityId as Entity)) this.hoverOverFloorTile(entityId as Entity, result.hits[0])
        if(VoxelComponent.has(entityId as Entity)) this.hoverOverVoxel(entityId as Entity, result.hits[0])
        // if(VoxelSelectorComponent.has(entityId as Entity)) this.hoverOverVoxelOrigin(entityId as Entity, result.hits[0])
      }
    }
  }





  private hoverOverFloorTile(entity: Entity, event: DeepReadonlyObject<RaycastHit>){
    const component = FloorTileComponent.get(entity)
    const { x, y, z } = component
    VoxelCursor.setPosition(x, y+.01, z, VoxelSelectorSides.BOTTOM)
  }

  private hoverOverVoxel(entity: Entity, event: DeepReadonlyObject<RaycastHit>){
    const component = VoxelComponent.getMutable(entity)
    const { x, y, z, entityId } = component
    const { normalHit } = event
    let position = Vector3.create(x,y,z)
    let side = VoxelSelectorSides.BOTTOM
    if(Vector3.equals(normalHit as Vector3, Vector3.Up())) { position.y+=1; side = VoxelSelectorSides.BOTTOM }
    if(Vector3.equals(normalHit as Vector3, Vector3.Down())) { position.y-=1; side = VoxelSelectorSides.TOP }
    if(Vector3.equals(normalHit as Vector3, Vector3.Right())) { position.x+=1; side = VoxelSelectorSides.NORTH }
    if(Vector3.equals(normalHit as Vector3, Vector3.Left())) { position.x-=1; side = VoxelSelectorSides.SOUTH }
    if(Vector3.equals(normalHit as Vector3, Vector3.Forward())) { position.z+=1; side = VoxelSelectorSides.WEST }
    if(Vector3.equals(normalHit as Vector3, Vector3.Backward())) { position.z-=1; side = VoxelSelectorSides.EAST }
    VoxelCursor.setPosition(position.x, position.y, position.z, side)

    pointerEventsSystem.onPointerDown(entityId,
      function () {
        VoxelManager.setId(position.x, position.y, position.z, 1)
      },
      {
        button: InputAction.IA_PRIMARY,
        hoverText: 'Add'
      }
    )
  }

  private hoverOverVoxelOrigin(entity: Entity, event: DeepReadonlyObject<RaycastHit>){
    const component = VoxelSelectorComponent.getMutable(entity)
    console.log('Get the meshname of the side that is being hit')
  }
}
export const VoxelFloor = new VoxelFloorInstance()
