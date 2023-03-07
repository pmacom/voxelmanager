import { engine, Schemas } from "@dcl/sdk/ecs";

export abstract class DCLConnectEntity<T> {
  public abstract label: string;
  public abstract settings: T;
  public abstract schema: typeof Schemas.String;
  public abstract syncComponents: string[];
  public abstract update: () => void;
} 

export type DCLConnectVideoScreenState = {
    state: string;
}

const stateName = 'EntityManager::Poster'
const stateSchema = {
  src: Schemas.String
}
// const parse = (stateSchema: any) => {
//     Object.keys(stateSchema).forEach(key => {
//         return typeof stateSchema[key]
//     })
// }
export const DCLConnectEntity_Poster = engine.defineComponent(stateName, stateSchema)

export abstract class Poster implements DCLConnectEntity<DCLConnectVideoScreenState> {
  public label = 'Poster'
  public syncComponents = ['Transform', 'DCLConnectEntity_Poster']
  public settings: DCLConnectVideoScreenState  = {
    state: ""
  };
  update() { } 
}