import { 
  Animator, 
  AudioSource, 
  AudioStream, 
  AvatarAttach, 
  Billboard, 
  CameraModeArea, 
  MeshCollider,
  MeshRenderer,
  PointerEvents, 
  Raycast, 
  Transform, 

  VisibilityComponent,
  AvatarModifierArea,
  AvatarShape,
  pointerEventsSystem,
  CameraMode,
  GltfContainer,
  inputSystem,
  Material,
  VideoPlayer,
  UiTransform,
  UiInput,
  UiBackground,
  UiDropdown,
  UiInputResult,
  UiDropdownResult,
  UiText,
  NftShape,
  PointerLock,

  MapResult,
  MapComponentDefinition,
  Entity,
} from "@dcl/sdk/ecs";

export enum VoxelType {
  NULL,
  BLOCK,
  TILE,
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
  NO_COLLIDER,
  COLLECTABLE,
  DECAY_10,
  DECAY_20,
}

const ComponentMapping = {
  "Animator": Animator,
  "AudioSource": AudioSource,
  "AudioStream": AudioStream,
  "AvatarAttach": AvatarAttach,
  "AvatarModifiedArea": AvatarModifierArea,
  // "AvatarShape": AvatarShape,
  "Billboard": Billboard,
  // "CameraMode": CameraMode,
  // "CameraModeArea": CameraModeArea,
  "GltfContainer": GltfContainer,
  "Material": Material,
  "MeshCollider": MeshCollider,
  "MeshRenderer": MeshRenderer,
  "NftShape": NftShape,
  // "PointerEvents": PointerEvents, // NOPE
  // "Raycast": Raycast, // NOPE
  "Transform": Transform,
  "PointerLock": PointerLock,

  // "UiDropdown": UiDropdown,
  // "UiDropdownResult": UiDropdownResult,
  // "UiText": UiText,
  // "UiBackground": UiBackground,
  // "UiTransform": UiTransform,
  // "UiInput": UiInput,
  // "UiInputResult": UiInputResult,
  "VisibilityComponent": VisibilityComponent,
  // "pointerEventsSystem": pointerEventsSystem,
  // "inputSystem": inputSystem,
  "VideoPlayer": VideoPlayer,
}

// const component = {"Transform": {
//   "position": {
//     "x": 0,
//     "y": 0,
//     "z": 0
//   }
// }}
type SomeType = keyof typeof ComponentMapping
// type MapResultType = MapComponentDefinition<MapResult<any>>[]
export function applyComponentMapping(entity: Entity, components: any) {
  Object.keys(components).forEach((key: string) => {
    const _key = key as unknown as SomeType;
    ComponentMapping[_key].create(entity, components[key]);
    // const comp = ComponentMapping[_key];
    // switch(_key){
    //   case "AudioSource": {
    //     AudioSource.create(entity, {})
    //   } break;
    // }
  })
}