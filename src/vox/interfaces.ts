// TODO: Rename a lot of these types so they are more rational. It's a bit confusing to know when/how to use one.

export enum VoxelType {
    DEFAULT,
    WALL,
    EXTERIOR,
    INTERIOR,
    FLOOR,
    GROUND,
    WINDOW,
    DOORWAY,
}

export interface TileData {
    model: string
    allowRotation: boolean
    onlyGroundFloor: boolean
    weight: number
    above: number[][]
    same: number[][]
    below: number[][]
    flattened: number[]
}

export enum VoxelConditions {
    NULL,
    IsAnyTile,
    IsSameTileId,
    IsEmpty,
    IsEmptyOrOther,

    IsFloorPlan,
    IsExterior,
    IsInterior,
    IsFloor,
    IsGround,
    IsWindow ,
    IsDoorway ,
}

export interface VoxelMatchmakerResult {
    rotationIndex: number | undefined
    strength: number | undefined
    tileIndex: number
}

export interface TileSet {
    name: string
    type: VoxelType
    tiles: Partial<TileData>[]
}

export interface VoxelComponentSettings {
    x: number
    y: number
    z: number
    tileSetId: number
    entityId: number
}

export interface VoxelNeighbors {
    above: VoxelComponentSettings[],
    same: VoxelComponentSettings[],
    below: VoxelComponentSettings[],
    flattened: VoxelComponentSettings[]
}