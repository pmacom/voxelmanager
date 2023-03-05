import { VoxelTile } from "../classes"
import { VoxelTileType } from "../enums"
import { TileDisplaySettings, VoxelBehavior } from '../interfaces'

const display: TileDisplaySettings = {
  name: "FloorPlan",
  tileSetId: 1,
  tileSetType: VoxelTileType.WALL,
  thumbnail: 'images/thumbnails/tilesets/default.png'
}

const behavior: VoxelBehavior = {
  health: 100
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
