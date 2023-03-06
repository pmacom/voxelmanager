import { VoxelTile } from "./classes"
import { VoxelTileType } from "./enums"
import { TileDisplaySettings, VoxelBehavior } from "./interfaces"


const display: TileDisplaySettings = {
  name: "FloorPlan", // Human readable string for UI
  tileSetId: 1, // Should the name just be a UUID or string? Maybe we can infer this from a registry somehow.
  tileSetType: VoxelTileType.WALL, // What type of tileset is it? Wall, Interior, Exterior, Floor
  thumbnail: 'images/thumbnails/tilesets/default.png'
}

const behavior: VoxelBehavior = { // There are a lot of options here
  // indestructable?: boolean
  // actions?: VoxelBehaviorActions[]
  // components?: MapComponentDefinition<MapResult<any>>[]
  // onClick?(): void
  // onHoverEnter?(): void
  // onHoverExit?(): void
  // onDestroy?(): void
  // onEnter?(): void
  // onExit?(): void
}

export class TileSet_FloorPlan_Default extends VoxelTile {
  public label: string = "FloorPlan"
  public display: TileDisplaySettings = display
  public behavior: VoxelBehavior = behavior
  public updateShape(): number {
    // Optional custom hook to calculate the correct tile
    return 500
  }
}