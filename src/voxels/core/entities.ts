import { engine, Schemas, ISchema } from "@dcl/sdk/ecs";


class Colyseus {
    room = {
        state: {
            "parcel": {
                "id": "63fee92703115689e80c3167",
                "baseParcel": "-150,-150",
                "defaultScene": "default",
                "owner": "0xd689478d44A438798EE0DC07657CcE2135c0AeF7",
                "editors": [],
                "canPublicEdit": true,
                "env": {}
            },
            "scene": {
                "id": "63fee92703115689e80c3172",
                "nickname": "default",
                "canPublicEdit": true,
                "editors": [],
                "components": {
                  // Schemas only
                  // Transform, PlaneShape, VideoMaterial, CustomState, Animator
                },
                "spawnPosition": {
                    "x": 7.71875,
                    "y": 17.7549991607666,
                    "z": 7.020263671875
                },
                "cameraTarget": {
                    "x": 8.958740234375,
                    "y": 17.7549991607666,
                    "z": 6.633544921875
                }
            },
            "players": {
                "bqVJ28gap": {
                    "displayName": "Seal#0120",
                    "sessionId": "bqVJ28gap",
                    "face256": "https://peer-ec1.decentraland.org/content/contents/QmZAiFKeBznoPkJTyiYj5BXA55LEAHdJkNengRB1SySGN5",
                    "userId": "0x9F2f69B8c89C7E4a8e340339f249F24494590120",
                    "realm": "LocalPreview",
                    "server": "https://127.0.0.1",
                    "isGuest": true
                },
            },
            //entities 
            "entities": {
              "633333333ffbdd01f7d7f34a5c584ec": {
                "type": "Poster"
              }
            },
            "voxels": {
                "63ffbdd01f7d7f34a5c584ec": {
                    //Components with state
                    "x": 9,
                    "y": 16,
                    "z": 5,
                    "tileSetId": 0,
                    "tileSetType": 0
                }
            },
            "media": {
                "640391bc83cae9302d210d4c": {
                    //Components with state
                    "x": 8.63623046875,
                    "y": 16.025,
                    "z": 6.545654296875,
                    "rx": 90,
                    "ry": 180.00000000000003,
                    "rz": 0,
                    "sx": 1,
                    "sy": 1,
                    "sz": 1,
                    "mediaType": "VIDEO",
                    "settings": {
                        "source": "https://metazoo-blob.nyc3.digitaloceanspaces.com/tunnel_flicker_loop_e2754f3871.mp4?updated_at=2023-01-16T07:07:37.706Z"
                    }
                },
            }
        }
    }
}


export abstract class DCLConnectEntity<T> {
  public abstract uuid: string;
  public abstract settings: T;
  public abstract schema2: ISchema | { [key: string]: ISchema } | ISchema[];
  public abstract syncComponents: string[];
  public abstract update: () => void;
} 

export type DCLConnectVideoScreenState = {
    state: string;
}

const VideoStateSchema = {
  playing: Schemas.Boolean,
  src: Schemas.String
}

const permissions = {
  isOwner: Schemas.Optional(Schemas.Boolean)
}

const stateName = 'EntityManager::Poster'
const stateSchema = {
  src: Schemas.String,
  video: Schemas.Map(VideoStateSchema),
  permisions: Schemas.Map(permissions)
}


// const parse = (stateSchema: any) => {
//     Object.keys(stateSchema).forEach(key => {
//         return typeof stateSchema[key]
//     })
// }
export const DCLConnectEntity_Poster = engine.defineComponent(stateName, stateSchema)

export abstract class Poster implements DCLConnectEntity<DCLConnectVideoScreenState> {
  public uuid = 'Poster1'
  public syncComponents = ['Transform', 'DCLConnectEntity_Poster']
  public settings: DCLConnectVideoScreenState  = {
    state: ""
  };
  update() { } 
}