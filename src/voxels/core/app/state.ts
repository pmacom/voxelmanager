import { _AppState_EditVoxelType, _AppState_Mode } from "./enums"

export class AppInstance {
  public mode: _AppState_Mode = _AppState_Mode.EDIT
  public voxelType: _AppState_EditVoxelType = _AppState_EditVoxelType.BLOCK
  public voxelTypes: any[] = []

  constructor(){

  }

  getVoxelTypeNames(){
    return this.voxelTypes.map(t=>t.label)
  }
}

export const AppState = new AppInstance()