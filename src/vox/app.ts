import { BlockList } from "./blocks"
import { Block } from "./blocks/interfaces"
import { AppMode, EditVoxelType } from "./interfaces"


export class AppInstance {
  public mode: AppMode = AppMode.EDIT
  public voxelType: EditVoxelType = EditVoxelType.BLOCK
  public voxelTypes: Block[] = BlockList

  constructor(){

  }

  getVoxelTypeNames(){
    return this.voxelTypes.map(t=>t.label)
  }
}

export const App = new AppInstance()