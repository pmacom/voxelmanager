import { flattenDeep } from "lodash"
import { VoxelConditions } from "../interfaces"
import { VoxelManager } from "../manager"
import { TileData } from "../interfaces" 
import { Schemas } from "@dcl/sdk/ecs"

const validate = (type: any) => {
    switch(type){
        case Schemas.Optional:
            break;
        case Schemas.Array:
            break;
        case Schemas.Boolean:
            break;
        case Schemas.Byte:
            break;

        case Schemas.Double:
        case Schemas.Short:
        case Schemas.Number:
        case Schemas.EnumNumber:
        case Schemas.Float:
        case Schemas.Entity:
        case Schemas.Int:
        case Schemas.Int64:
            break;
        case Schemas.Map:
            break;


        case Schemas.Quaternion:
        case Schemas.Vector3:
        case Schemas.Color3:
        case Schemas.Color4:
            break;
            
        case Schemas.EnumString:
        case Schemas.String:
            break;
    }
}

const weightGuide: {[key:number]: number} = {
    [VoxelConditions.NULL]: 0,
    [VoxelConditions.IsAnyTile]: 100,
    [VoxelConditions.IsSameTileId]: 100,
    [VoxelConditions.IsEmpty]: 100,
    [VoxelConditions.IsFloorPlan]: 100,
    [VoxelConditions.IsExterior]: 100,
    [VoxelConditions.IsInterior]: 100,
    [VoxelConditions.IsFloor]: 100,
    [VoxelConditions.IsGround]: 100,
    [VoxelConditions.IsWindow]: 100,
    [VoxelConditions.IsDoorway]: 100,
}

export const GetTileSetWithCalculatedWeights = (tileSet: Partial<TileData>[]) => {
    return tileSet.map(tile => {
        const { above, same, below } = tile
        const flattened: number[] = []
        let weight = tile.weight ? tile.weight : -1
        if(!above || !same || !below) return tile
        flattenDeep([...above, ...same, ...below]).forEach((_type: number) => {
            flattened.push(_type)
            if(weightGuide[_type]) weight += weightGuide[_type]
        })
        tile.weight = weight
        tile.flattened = flattened
        return tile
    })
}

export const GetTileWeight = (x: number, y: number, z: number) => {
    const neighbors = VoxelManager.getNeighbors(x,y,z)
    if(!neighbors) return 0
    console.log({neighbors})
    
}

export interface VoxelMatchmakerResult {
    rotationIndex: number | undefined
    strength: number | undefined
    tileIndex: number
}

export const VoxelMatchmaker = (
    neighborIdsFlattened: number[],
    conditionIdsFlattened: VoxelConditions[],
    tileIndex: number,
    tileSetId: number,
): VoxelMatchmakerResult => {
    let rotationIndex: number | undefined
    let strength: number = 0
    const rotations = [rotation_0, rotation_90, rotation_120, rotation_270]

    // [:]

    rotations.forEach((ids: number[], rIndex: number) => {
        let localstrength = 0
        // console.log('Checking Rotation', rIndex)
        ids.forEach((id: number, index: number) => {
           // if(localstrength<0) return
            switch(conditionIdsFlattened[id]){
                case VoxelConditions.IsAnyTile:
                    
                    if(neighborIdsFlattened[index] > 0){
                        console.log({ rIndex, id, index, type: 'isAnyTile', action: '+1'})
                        localstrength++
                    }else{
                        console.log({ rIndex, id, index, type: 'isAnyTile', action: 'DUMP'})
                        localstrength = -1
                    }
                    break;
                case VoxelConditions.IsSameTileId:

                    if(neighborIdsFlattened[index] == tileSetId){
                        console.log({
                            // rIndex,
                            // id,
                            // index,
                            type: 'IsSameTileId',
                            action: '+1',
                            flattenedId: neighborIdsFlattened[index]
                        })
                        localstrength++
                    }else{
                        console.log({
                            // rIndex,
                            // id,
                            // index,
                            type: 'IsSameTileId',
                            action: 'DUMP',
                            tileSetId,
                            neighborIndexType: neighborIdsFlattened[index],
                            desiredType: VoxelConditions.IsSameTileId,
                            flattenedId: neighborIdsFlattened[index]
                        })
                        localstrength = -1
                    }
                    break;
                case VoxelConditions.IsEmptyOrOther:
                    if(neighborIdsFlattened[index] !== 0){
                        localstrength++
                        console.log({ rIndex, id, index, type: 'IsEmptyOrOther', action: '+1'})
                    }else{
                        console.log({ rIndex, id, index, type: 'IsEmptyOrOther', action: '-1'})
                        localstrength = -1
                    }
                    break;
            }
        })

        if(localstrength >= strength){
            rotationIndex = rIndex
            strength = localstrength
        }else{

        }
    })
    return { rotationIndex, strength, tileIndex }
}


const rotation_0 = [
    0, 1, 2,
    3, 4, 5,
    6, 7, 8,

    9, 10, 11,
    12, 13, 14,
    15, 16, 17,

    18, 19, 20,
    21, 22, 23,
    24, 25, 26,
]

const rotation_90 = [
    6, 3, 0,
    7, 4, 1,
    8, 5, 2,

    15, 12, 9,
    16, 13, 10,
    17, 14, 11,

    24, 21, 18,
    25, 22, 19,
    26, 23, 20,
]

const rotation_120 = [
    8, 7, 6,
    5, 4, 3,
    2, 1, 0,

    17, 16, 15,
    14, 13, 12,
    11, 10, 9,

    26, 25, 24,
    23, 22, 21,
    20, 19, 18,
]



const rotation_270 = [
    2, 5, 8,
    1, 4, 7,
    0, 3, 6,

    11, 14, 17,
    10, 13, 16,
    9, 12, 15,

    20, 23, 26,
    19, 22, 25,
    18, 21, 24,
]
