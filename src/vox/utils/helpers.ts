// TODO: Some of these might not be necessary after another round of refactoring

import { Vector3 } from "@dcl/sdk/math"
import { VoxelComponentSettings } from "../interfaces"

export const getPath = (x:number, y:number, z:number) => `${x},${y},${z}`
export const getPathFromVector3 = (position: Vector3) => `${position.x},${position.y},${position.z}`

export const forEachGrid = (start: Vector3, end: Vector3, callback: (x: number, y:number, z:number) => void) => {
    for(let x=start.x; x<=end.x; x++){
        for(let y=start.y; y<=end.y; y++){
            for(let z=start.z; z<=end.z; z++){
                callback(x,y,z)
            }
        }
    }
}

export const GetAbove = (voxels: (undefined | VoxelComponentSettings)[]) => 
    [ ...voxels.slice(6,9), ...voxels.slice(15,18), ...voxels.slice(24,27) ]

export const GetSame = (voxels: (undefined | VoxelComponentSettings)[]) =>
    [ ...voxels.slice(3,6), ...voxels.slice(12,15), ...voxels.slice(21,24) ]

export const GetBelow = (voxels: (undefined | VoxelComponentSettings)[]) =>
    [ ...voxels.slice(0,3), ...voxels.slice(9,12), ...voxels.slice(18,21) ]