import { flattenDeep } from "lodash"
import { TileData } from "./interfaces"

export const parseTile = (tiles: Partial<TileData>[]) => {
  return tiles.map(tile => {
      if(tile.above && tile.same && tile.below){
          tile.flattened = flattenDeep([...tile.above, ...tile.same, ...tile.below])
      }
      return tile
  })
}
