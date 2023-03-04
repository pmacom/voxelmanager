import { flattenDeep } from 'lodash'
import { TileConditions, TileMatchmakerResult } from '../interfaces'
import { VoxelManager } from '../manager'
import { TileData } from '../interfaces'
import { Schemas } from '@dcl/sdk/ecs'

export const GetTileWeight = (x: number, y: number, z: number) => {
  const neighbors = VoxelManager.getNeighbors(x, y, z)
  if (!neighbors) return 0
  console.log({ neighbors })
}


const rotation_0 = [
    0, 1, 2, 3, 4, 5, 6, 7, 8,
  
    9, 10, 11, 12, 13, 14, 15, 16, 17,
  
    18, 19, 20, 21, 22, 23, 24, 25, 26
  ]
  
  const rotation_90 = [
    6, 3, 0, 7, 4, 1, 8, 5, 2,
  
    15, 12, 9, 16, 13, 10, 17, 14, 11,
  
    24, 21, 18, 25, 22, 19, 26, 23, 20
  ]
  
  const rotation_120 = [
    8, 7, 6, 5, 4, 3, 2, 1, 0,
  
    17, 16, 15, 14, 13, 12, 11, 10, 9,
  
    26, 25, 24, 23, 22, 21, 20, 19, 18
  ]
  
  const rotation_270 = [
    2, 5, 8, 1, 4, 7, 0, 3, 6,
  
    11, 14, 17, 10, 13, 16, 9, 12, 15,
  
    20, 23, 26, 19, 22, 25, 18, 21, 24
  ]
  

export const TileMatchmaker = (
  neighborIdsFlattened: number[],
  conditionIdsFlattened: TileConditions[],
  tileIndex: number,
  tileSetId: number
): TileMatchmakerResult => {
  let rotation: number = 0
  let strength: number = 0
  const rotations = [rotation_0, rotation_90, rotation_120, rotation_270]

  rotations.forEach((tileSetIds: number[], rotationIndex: number) => {
    const rotatedTileSetIds = applyRotation(neighborIdsFlattened, tileSetIds)
    let lstrength = 0
    conditionIdsFlattened.forEach((condition: TileConditions, index:number) => {
        if(lstrength<0 || index == 13) return
        switch(condition){
            case TileConditions.IsSameTileId:
                if(rotatedTileSetIds[index] == tileSetId){ lstrength++ }else{ lstrength = -1}
                break;
        }
    })
    if(lstrength > strength){
        rotation = rotationIndex
        strength = lstrength
    }
  })

//   rotations.forEach((rotatedIndexes: number[], rotationIndex: number) => {
//     console.log('checking rotation', rotationIndex)
//     console.log(`ComparingLocal${tileIndex} - WE BEGIN THE MADNESS`, neighborIdsFlattened, rotatedIndexes)
//     let localstrength = 0
//     // console.log('Checking Rotation', rIndex)
//     rotatedIndexes.forEach((id: number, index: number) => {
//       if (index == 13 || localstrength < 0) return
//       console.log(`ComparingLocal${tileIndex} ----------- ComparingLocal`)
//       switch (conditionIdsFlattened[id]) {
//         // case VoxelConditions.IsAnyTile:
//         //     localstrength = neighborIdsFlattened[id] > 0 ? localstrength+1 : -1
//         //     break;
//         case TileConditions.IsSameTileId:
//           if (neighborIdsFlattened[id] == tileSetId) {
//             console.log(`ComparingLocal${tileIndex} +1`)
//             localstrength++
//           }else{
//             console.log(`ComparingLocal${tileIndex} -1 - DUMPING`, { neighborId: neighborIdsFlattened[id], myTileSetId: tileSetId})
//             localstrength=-1
//           }
//           console.log(`ComparingLocal${tileIndex} IsSameTileId result`, { localstrength, strength })
//           break
//         default:
//             break;
//         // case VoxelConditions.IsEmptyOrOther:
//         //     localstrength = neighborIdsFlattened[id] !== tileSetId ? localstrength+1 : -1
//         //     break;
//       }
//     })
//     console.log(`ComparingLocal${tileIndex}`, { strength, localstrength })
//     if (localstrength > strength) {
//       rotationIndex = rotationIndex
//       strength = localstrength
//       console.log(`ComparingLocal${tileIndex} Updating strength to`, localstrength)
//     }
//   })
  console.log('--- DONE WITH MATCHMAKING', { rotation, strength, tileIndex })
  return { rotation, strength, tileIndex }
}

const applyRotation = (input: number[], rotations: number[]) => rotations.map((index: number) => input[index])

const debugPrintRotation = (rotated: number[]) => {
    console.log(`\n
    A: ${rotated[0]},${rotated[1]},${rotated[2]},\n
    A: ${rotated[3]},${rotated[4]},${rotated[5]},\n
    A: ${rotated[6]},${rotated[7]},${rotated[8]},\n
    S: ${rotated[9]},${rotated[10]},${rotated[11]},\n
    S: ${rotated[12]},${rotated[13]},${rotated[14]},\n
    S: ${rotated[15]},${rotated[16]},${rotated[17]},\n
    B: ${rotated[18]},${rotated[19]},${rotated[20]},\n
    B: ${rotated[21]},${rotated[22]},${rotated[23]},\n
    B: ${rotated[24]},${rotated[25]},${rotated[26]},\n
    \n`)
}