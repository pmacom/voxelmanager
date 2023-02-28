// Theoretically, we can make a blender export utilitiy for generating this kind of file
// Perhaps the output of that blender json file will be parsed by a utility function?

import { TileSet, VoxelConditions, VoxelType } from "../../interfaces";
import { GetTileSetWithCalculatedWeights } from "../../utils/weights";

const getModelSrc = (id: number) => `models/walls/walls_type_${id}.glb`

export const Tiles_Walls: TileSet = {
    name: "defaultTiles",
    type: VoxelType.WALL,
    tiles: GetTileSetWithCalculatedWeights([
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
                [0, VoxelConditions.IsSameTileId, 0],
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
                [0, VoxelConditions.IsSameTileId, 0],
                [0, 0, VoxelConditions.IsSameTileId],
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
                [0, VoxelConditions.IsSameTileId, VoxelConditions.IsEmptyOrOther],
                [0, 0, VoxelConditions.IsSameTileId],
                [0, VoxelConditions.IsSameTileId, VoxelConditions.IsEmptyOrOther],
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
                [VoxelConditions.IsEmptyOrOther, VoxelConditions.IsSameTileId, VoxelConditions.IsEmptyOrOther],
                [VoxelConditions.IsSameTileId, 0, VoxelConditions.IsSameTileId],
                [VoxelConditions.IsEmptyOrOther, VoxelConditions.IsSameTileId, VoxelConditions.IsEmptyOrOther],
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
                [0, VoxelConditions.IsSameTileId, 0],
                [0, 0, 0],
                [0, VoxelConditions.IsSameTileId, 0],
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
                [VoxelConditions.IsEmptyOrOther, VoxelConditions.IsSameTileId, VoxelConditions.IsEmptyOrOther],
                [VoxelConditions.IsSameTileId, 0, VoxelConditions.IsEmptyOrOther],
                [VoxelConditions.IsSameTileId, VoxelConditions.IsEmptyOrOther, VoxelConditions.IsEmptyOrOther],
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
                [VoxelConditions.IsSameTileId, VoxelConditions.IsSameTileId, VoxelConditions.IsSameTileId],
                [VoxelConditions.IsSameTileId, 0, VoxelConditions.IsSameTileId],
                [VoxelConditions.IsSameTileId, VoxelConditions.IsSameTileId, VoxelConditions.IsSameTileId],
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
                [VoxelConditions.IsEmptyOrOther, VoxelConditions.IsEmptyOrOther, VoxelConditions.IsSameTileId],
                [VoxelConditions.IsEmptyOrOther, 0, VoxelConditions.IsEmptyOrOther],
                [VoxelConditions.IsSameTileId, VoxelConditions.IsEmptyOrOther, VoxelConditions.IsEmptyOrOther],
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
                [0, VoxelConditions.IsSameTileId, 0],
                [0, 0, 0],
                [VoxelConditions.IsSameTileId, VoxelConditions.IsEmptyOrOther, 0],
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
                [0, VoxelConditions.IsSameTileId, 0],
                [0, 0, VoxelConditions.IsEmptyOrOther],
                [VoxelConditions.IsEmptyOrOther, VoxelConditions.IsEmptyOrOther, VoxelConditions.IsSameTileId],
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
                [VoxelConditions.IsEmptyOrOther, VoxelConditions.IsEmptyOrOther, VoxelConditions.IsSameTileId],
                [VoxelConditions.IsEmptyOrOther, 0, VoxelConditions.IsEmptyOrOther],
                [VoxelConditions.IsSameTileId, VoxelConditions.IsEmptyOrOther, VoxelConditions.IsEmptyOrOther],
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
                [VoxelConditions.IsSameTileId, VoxelConditions.IsEmptyOrOther, VoxelConditions.IsEmptyOrOther],
                [VoxelConditions.IsEmptyOrOther, 0, VoxelConditions.IsEmptyOrOther],
                [VoxelConditions.IsEmptyOrOther, VoxelConditions.IsEmptyOrOther, VoxelConditions.IsEmptyOrOther],
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
                [0, VoxelConditions.IsSameTileId, 0],
                [0, 0, 0],
                [VoxelConditions.IsSameTileId, VoxelConditions.IsEmptyOrOther, VoxelConditions.IsSameTileId],
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
                [0, VoxelConditions.IsSameTileId, 0],
                [0, 0, 0],
                [0, VoxelConditions.IsSameTileId, 0],
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
                [0, VoxelConditions.IsEmptyOrOther, 0],
                [0, 0, 0],
            ],
            same: [
                [0, VoxelConditions.IsSameTileId, 0],
                [0, 0, 0],
                [0, VoxelConditions.IsSameTileId, 0],
            ],
            below: [
                [0, 0, 0],
                [0, VoxelConditions.IsAnyTile, 0],
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
                [0, VoxelConditions.IsSameTileId, VoxelConditions.IsEmptyOrOther],
                [0, 0, VoxelConditions.IsSameTileId],
                [0, VoxelConditions.IsSameTileId, VoxelConditions.IsEmptyOrOther],
            ],
            below: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ],
        },
    ])    
}
