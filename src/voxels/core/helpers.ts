import { Vector3 } from "@dcl/sdk/math"

export const getPath = (x: number, y: number, z: number) => `${x},${y},${z}`

export const forEachGrid = (start: Vector3, end: Vector3, callback: (x: number, y: number, z: number) => void) => {
  for (let x = start.x; x <= end.x; x++) {
    for (let y = start.y; y <= end.y; y++) {
      for (let z = start.z; z <= end.z; z++) {
        callback(x, y, z)
      }
    }
  }
}