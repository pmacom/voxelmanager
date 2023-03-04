import { flattenDeep } from 'lodash'
import { VoxelConditions } from '../interfaces'
import { VoxelManager } from '../manager'
import { TileData } from '../interfaces'
import { Schemas } from '@dcl/sdk/ecs'

export const GetTileWeight = (x: number, y: number, z: number) => {
  const neighbors = VoxelManager.getNeighbors(x, y, z)
  if (!neighbors) return 0
  console.log({ neighbors })
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
  tileSetId: number
): VoxelMatchmakerResult => {
  console.log('+++ VOXELMATCHMAKER', neighborIdsFlattened, conditionIdsFlattened, tileIndex, tileSetId)
  let rotationIndex: number | undefined
  let strength: number = 0
  const rotations = [rotation_0, rotation_90, rotation_120, rotation_270]

  rotations.forEach((rotatedIndexes: number[], rotationIndex: number) => {
    console.log('checking rotation', rotationIndex)
    let localstrength = 0
    // console.log('Checking Rotation', rIndex)
    rotatedIndexes.forEach((id: number, index: number) => {
      if (index == 13 || localstrength < 0) return
      switch (conditionIdsFlattened[id]) {
        // case VoxelConditions.IsAnyTile:
        //     localstrength = neighborIdsFlattened[id] > 0 ? localstrength+1 : -1
        //     break;
        case VoxelConditions.IsSameTileId:
          if (neighborIdsFlattened[id] == tileSetId) {
            console.log('ComparingLocal +1')
          }
          localstrength = neighborIdsFlattened[id] == tileSetId ? localstrength + 1 : -1
          console.log('ComparingLocal IsSameTileId result', { localstrength, strength })
          break
        // case VoxelConditions.IsEmptyOrOther:
        //     localstrength = neighborIdsFlattened[id] !== tileSetId ? localstrength+1 : -1
        //     break;
      }
    })
    console.log('ComparingLocal', { strength, localstrength })
    if (localstrength > strength) {
      rotationIndex = rotationIndex
      strength = localstrength
      console.log('ComparingLocal Updating strength to', localstrength)
    }
  })
  console.log('--- DONE WITH MATCHMAKING', { rotationIndex, strength, tileIndex })
  return { rotationIndex, strength, tileIndex }
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
