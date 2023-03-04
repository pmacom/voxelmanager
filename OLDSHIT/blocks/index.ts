import { BlockType_Bedrock } from "./default/bedrock";
import { BlockType_Grass } from "./default/grass";
import { BlockSettings } from "./interfaces";

export const BlockList: BlockSettings[] = [
  new BlockType_Bedrock(),
  new BlockType_Grass(),
]