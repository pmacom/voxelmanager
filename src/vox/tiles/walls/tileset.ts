// Theoretically, we can make a blender export utilitiy for generating this kind of file
// Perhaps the output of that blender json file will be parsed by a utility function?

import { TileSet, TileConditions, TileType } from "../../interfaces";
import { parseTile } from "../../utils/helpers";

const getModelSrc = (id: number) => `models/walls/walls_type_${id}.glb`

export const Tiles_Walls_FULL: TileSet = {
    name: "defaultTiles",
    type: TileType.WALL,
    tiles: parseTile([
        {
            model: getModelSrc(1),
            allowRotation: true,
            above: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ],
            same: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ],
            below: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ],
        },
        {
            model: getModelSrc(2),
            allowRotation: true,
            above: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ],
            same: [
                [0, TileConditions.IsSameTileId, 0],
                [0, 0, 0],
                [0, 0, 0],
            ],
            below: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ],
        },
        {
            model: getModelSrc(3),
            allowRotation: true,
            above: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ],
            same: [
                [0, TileConditions.IsSameTileId, 0],
                [0, 0, TileConditions.IsSameTileId],
                [0, 0, 0],
            ],
            below: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ],
        },
        {
            model: getModelSrc(4),
            allowRotation: true,
            above: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ],
            same: [
                [0, TileConditions.IsSameTileId, TileConditions.IsEmptyOrOther],
                [0, 0, TileConditions.IsSameTileId],
                [0, TileConditions.IsSameTileId, TileConditions.IsEmptyOrOther],
            ],
            below: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ],
        },
        {
            model: getModelSrc(5),
            allowRotation: true,
            above: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ],
            same: [
                [TileConditions.IsEmptyOrOther, TileConditions.IsSameTileId, TileConditions.IsEmptyOrOther],
                [TileConditions.IsSameTileId, 0, TileConditions.IsSameTileId],
                [TileConditions.IsEmptyOrOther, TileConditions.IsSameTileId, TileConditions.IsEmptyOrOther],
            ],
            below: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ],
        },
        {
            model: getModelSrc(6),
            allowRotation: true,
            above: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ],
            same: [
                [0, TileConditions.IsSameTileId, 0],
                [0, 0, 0],
                [0, TileConditions.IsSameTileId, 0],
            ],
            below: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ],
        },
        {
            model: getModelSrc(7),
            allowRotation: true,
            above: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ],
            same: [
                [TileConditions.IsEmptyOrOther, TileConditions.IsSameTileId, TileConditions.IsEmptyOrOther],
                [TileConditions.IsSameTileId, 0, TileConditions.IsEmptyOrOther],
                [TileConditions.IsSameTileId, TileConditions.IsEmptyOrOther, TileConditions.IsEmptyOrOther],
            ],
            below: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ],
        },
        {
            model: getModelSrc(8),
            allowRotation: true,
            above: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ],
            same: [
                [TileConditions.IsSameTileId, TileConditions.IsSameTileId, TileConditions.IsSameTileId],
                [TileConditions.IsSameTileId, 0, TileConditions.IsSameTileId],
                [TileConditions.IsSameTileId, TileConditions.IsSameTileId, TileConditions.IsSameTileId],
            ],
            below: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ],
        },
        {
            model: getModelSrc(9),
            allowRotation: true,
            above: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ],
            same: [
                [TileConditions.IsEmptyOrOther, TileConditions.IsEmptyOrOther, TileConditions.IsSameTileId],
                [TileConditions.IsEmptyOrOther, 0, TileConditions.IsEmptyOrOther],
                [TileConditions.IsSameTileId, TileConditions.IsEmptyOrOther, TileConditions.IsEmptyOrOther],
            ],
            below: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ],
        },
        {
            model: getModelSrc(10),
            allowRotation: true,
            above: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ],
            same: [
                [0, TileConditions.IsSameTileId, 0],
                [0, 0, 0],
                [TileConditions.IsSameTileId, TileConditions.IsEmptyOrOther, 0],
            ],
            below: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ],
        },
        {
            model: getModelSrc(11),
            allowRotation: true,
            above: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ],
            same: [
                [0, TileConditions.IsSameTileId, 0],
                [0, 0, TileConditions.IsEmptyOrOther],
                [TileConditions.IsEmptyOrOther, TileConditions.IsEmptyOrOther, TileConditions.IsSameTileId],
            ],
            below: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ],
        },
        {
            model: getModelSrc(12),
            allowRotation: true,
            above: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ],
            same: [
                [TileConditions.IsEmptyOrOther, TileConditions.IsEmptyOrOther, TileConditions.IsSameTileId],
                [TileConditions.IsEmptyOrOther, 0, TileConditions.IsEmptyOrOther],
                [TileConditions.IsSameTileId, TileConditions.IsEmptyOrOther, TileConditions.IsEmptyOrOther],
            ],
            below: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ],
        },
        {
            model: getModelSrc(13),
            allowRotation: true,
            above: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ],
            same: [
                [TileConditions.IsSameTileId, TileConditions.IsEmptyOrOther, TileConditions.IsEmptyOrOther],
                [TileConditions.IsEmptyOrOther, 0, TileConditions.IsEmptyOrOther],
                [TileConditions.IsEmptyOrOther, TileConditions.IsEmptyOrOther, TileConditions.IsEmptyOrOther],
            ],
            below: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ],
        },
        {
            model: getModelSrc(14),
            allowRotation: true,
            above: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ],
            same: [
                [0, TileConditions.IsSameTileId, 0],
                [0, 0, 0],
                [TileConditions.IsSameTileId, TileConditions.IsEmptyOrOther, TileConditions.IsSameTileId],
            ],
            below: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ],
        },
        {
            model: getModelSrc(15),
            allowRotation: true,
            above: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ],
            same: [
                [0, TileConditions.IsSameTileId, 0],
                [0, 0, 0],
                [0, TileConditions.IsSameTileId, 0],
            ],
            below: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ],
        },
        {
            model: getModelSrc(16),
            allowRotation: true,
            above: [
                [0, 0, 0],
                [0, TileConditions.IsEmptyOrOther, 0],
                [0, 0, 0],
            ],
            same: [
                [0, TileConditions.IsSameTileId, 0],
                [0, 0, 0],
                [0, TileConditions.IsSameTileId, 0],
            ],
            below: [
                [0, 0, 0],
                [0, TileConditions.IsAnyTile, 0],
                [0, 0, 0],
            ],
        },
        {
            model: getModelSrc(17),
            allowRotation: true,
            above: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ],
            same: [
                [0, TileConditions.IsSameTileId, TileConditions.IsEmptyOrOther],
                [0, 0, TileConditions.IsSameTileId],
                [0, TileConditions.IsSameTileId, TileConditions.IsEmptyOrOther],
            ],
            below: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ],
        },
    ])    
}

export const Tiles_Walls = Tiles_Walls_FULL


/* Slim down the options for testing. */
// export const Tiles_Walls = {
//     name: "defaultTiles",
//     type: TileType.WALL,
//     tiles: Tiles_Walls_FULL.tiles.slice(0,2)
// }

console.log({ length: Tiles_Walls.tiles.length })