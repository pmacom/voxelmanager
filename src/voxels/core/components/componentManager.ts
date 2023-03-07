import { Animator, BaseComponent, AudioSource, AudioStream, AvatarAttach, AvatarModifierArea, Billboard, GltfContainer, MapComponentDefinition, MapResult, Material, MeshCollider, MeshRenderer, NftShape, PointerLock, Transform, VideoPlayer, VisibilityComponent, engine } from "@dcl/sdk/ecs"

class ComponentManagerInstance {
  public components: Map<string, MapComponentDefinition<MapResult<any>>> = new Map()

  constructor(){
    this.components.set("Animator", Animator)
    this.components.set("AudioSource", AudioSource)
    this.components.set("AudioStream", AudioStream)
    this.components.set("AvatarAttach", AvatarAttach)
    this.components.set("AvatarModifiedArea", AvatarModifierArea)
    this.components.set("Billboard", Billboard)
    this.components.set("GltfContainer", GltfContainer)
    this.components.set("Material", Material)
    this.components.set("MeshCollider", MeshCollider)
    this.components.set("MeshRenderer", MeshRenderer)
    this.components.set("NftShape", NftShape)
    this.components.set("Transform", Transform)
    this.components.set("PointerLock", PointerLock)
    this.components.set("VisibilityComponent", VisibilityComponent)
    this.components.set("VideoPlayer", VideoPlayer)
  }

  addComponent(name: string, component: MapComponentDefinition<MapResult<any>>){
    component.create(engine.addEntity(), { src: "testing" })
    this.components.set(name, component)
  }

  getComponent(name: string): (MapComponentDefinition<MapResult<any>> | undefined) {
    return this.components.get(name)
  }
}
const e1 = engine.addEntity()


export const ComponentManager = new ComponentManagerInstance()