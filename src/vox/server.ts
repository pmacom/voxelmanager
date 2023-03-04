// ///<reference lib="es2015.symbol" />
// ///<reference lib="es2015.symbol.wellknown" />
// ///<reference lib="es2015.collection" />
// ///<reference lib="es2015.iterable" />

// import { Client, Room } from "colyseus.js";
// import { Wait } from "../dash/wait";

// // import { getCurrentRealm } from "@decentraland/EnvironmentAPI";
// // import { getUserData } from "@decentraland/Identity";
// // import { Dash_Wait } from "dcldash";
// // import { makeid } from "zootools";
// // import { GameControllerInstance } from "../GameController";
// // import { getParcel } from "@decentraland/ParcelIdentity";


// export class GameClient {
//     // endpoint: string = `ws://localhost:4250`;
//     endpoint: string = `wss://dcl-voxel-api.herokuapp.com`;
//     options?: any;
//     client!: Client;
//     room?: Room | null;
//     attempts: number = 0;
//     connecting: boolean = false;
//     onRoomConnectedCbs: ((room: Room) => void)[] = [];

//     constructor() { }

//     onRoomConnected(cb: (room: Room) => void) {
//         this.onRoomConnectedCbs.push(cb);
//         this.options.debug && this.log(`onRoomConnected Callback was set`)
//     }

//     async setConfig(
//         config: {
//             endpoint: string,
//             sceneOwner: string,
//             nickname: string,
//             debug?: boolean,
//         }
//     ) {
//         if (config.debug == undefined) config.debug = true;
//         // const { land: { sceneJsonData: { scene: { parcels, base: baseParcel } } }} = await getParcel();
//         this.endpoint = config.endpoint;
//         this.client = new Client(this.endpoint);
//         this.options = {};
//         this.options.baseParcel = "-150,-150";
//         this.options.parcels = ["-150,-150"];
//         // this.options.baseParcel = baseParcel;
//         // this.options.parcels = parcels;
//         this.options.nickname = config.nickname;
//         this.options.roomName = "update";
//         this.options.sceneOwner = config.sceneOwner;
//         this.options.debug = config.debug;
//         this.options.debug && this.log(`Configuration set`)
//         return await this.connect(this.options);
//     }

//     async connect(options: any & {
//         nickname: string;
//         roomName: string;
//         debug?: boolean;
//     } = this.options): Promise<Room | null> {

//         if (options.debug == undefined) options.debug = false;
//         else this.options.debug = options.undefined;

//         //An ID for debugging connection instances
//         // const id = makeid(5);
//         const id = Math.random().toString().substring(3, 8)

//         //Record attempts. In case of disconnect we will use this to time the reconnection attempt
//         this.attempts++;
//         if (this.attempts > 15) this.attempts = 15;
//         options.debug && this.log(`Attempting connection to server id:${id} (attempts: ${this.attempts})`)

//         //Populate user and options
//         // options.realm = await getCurrentRealm();
//         // options.userData = await getUserData();
//         options.timezone = new Date().toString();

//         //Ensure avatars are pointed to content servers
//         // const regex = /^https?:\/\/[^\/]+\.[^\/]+\/content\/contents\/[a-zA-Z0-9_]+$/;
//         // const snapshots = options?.userData?.avatar?.snapshots;
//         // Object.keys(snapshots).forEach(key => {
//         //     const snapshot = snapshots[key];
//         //     if (!regex.test(snapshot)) {
//         //         delete options.userData.avatar.snapshots[key];
//         //     }
//         // });

//         this.options = options;
//         const handleReconnection = () => {
//             Wait.create(() => this.connect(options), this.attempts * 1000);
//         }

//         const options_test = {
//             "baseParcel": "-150,-150",
//             "parcels": [
//                 "-150,-150"
//             ],
//             "nickname": "default",
//             "roomName": "update",
//             "sceneOwner": "0xd689478d44A438798EE0DC07657CcE2135c0AeF7",
//             "realm": {
//                 "domain": "https://127.0.0.1",
//                 "layer": "",
//                 "room": "",
//                 "serverName": "LocalPreview",
//                 "displayName": "LocalPreview",
//                 "protocol": "v2"
//             },
//             "userData": {
//                 "displayName": "Ednut#263e",
//                 "publicKey": null,
//                 "hasConnectedWeb3": false,
//                 "userId": "0x0c744d0a85f27788f2a074cff3e8f2077503263e",
//                 "version": 0,
//                 "avatar": {
//                     "bodyShape": "urn:decentraland:off-chain:base-avatars:BaseMale",
//                     "skinColor": "#ECE8E2",
//                     "hairColor": "#ECE8E2",
//                     "eyeColor": "#20B3F6",
//                     "wearables": [
//                         "urn:decentraland:off-chain:base-avatars:sleeveless_punk_shirt",
//                         "urn:decentraland:off-chain:base-avatars:trash_jean",
//                         "urn:decentraland:off-chain:base-avatars:citycomfortableshoes",
//                         "urn:decentraland:off-chain:base-avatars:punk",
//                         "urn:decentraland:off-chain:base-avatars:horseshoe_beard",
//                         "urn:decentraland:off-chain:base-avatars:Thunder_earring"
//                     ],
//                     "snapshots": {
//                         "face256": "https://peer-ec1.decentraland.org/content/contents/QmSjMWHjFFb7XoL3JhTtKoNZrjGTURXAggHc9BesM2BotL",
//                         "body": "https://peer-ec1.decentraland.org/content/contents/QmS55f4SmEqLjn7aoppn8wRSV8znEiKFYBc7Q8iv8og6Jp"
//                     }
//                 }
//             },
//             "timezone": "Wed Mar 01 2023 13:30:40 GMT-0500 (Eastern Standard Time)"
//         }

//         try {
//             this.room = await this.client.joinOrCreate<any>(options.roomName, options_test );
//             debugger
//             if (this.room) {
//                 this.log("Connected to server")
//                 this.onRoomConnectedCbs.forEach(cb => cb(this.room!));
//                 this.onConnected(id);
//                 this.room.onStateChange((state) => {
//                     this.log(`STATE CHANGE`, state)
//                     // this.gameController.voxelUI.setSceneId(state.scene.id);
//                     // this.gameController.voxelUI.setVoxelCount(state.voxels.size);
//                     // this.gameController.voxelUI.setMediaCount(state.media.size);
//                     // this.gameController.voxelUI.setSceneName(state.scene.nickname);
//                 });
//                 // this.room.onMessage("notification", (msg: any) => {
//                 //     const { message } = msg;
//                 //     this.gameController.voxelUI.notification(message);
//                 // });
//                 // this.room.onMessage("sync-voxels", (message: any) => {
//                 //     message.voxels.forEach((voxel: any) => {
//                 //         this.gameController.voxelManager.set(voxel.x, voxel.y, voxel.z, voxel.tileSetId, true);
//                 //     })
//                 //     this.gameController.voxelManager.renderAll()
//                 // });
//                 // this.room.onMessage("sync-media", (message: any) => {
//                 //     message.media.forEach((media: any) => {
//                 //         const { _id, mediaType, settings, x, y, z, rx, ry, rz, sx, sy, sz } = media;
//                 //         this.gameController.mediaManager.set(_id, mediaType, settings, x, y, z, rx, ry, rz, sx, sy, sz);
//                 //     })
//                 // });
//                 // this.room.onMessage("add-voxel", (message) => {
//                 //     const { x, y, z, tileSetId } = message;
//                 //     this.gameController.voxelManager.set(x, y, z, tileSetId);
//                 // });
//                 // this.room.onMessage("remove-voxel", (message) => {
//                 //     const { x, y, z } = message;
//                 //     this.gameController.voxelManager.set(x, y, z, null);
//                 // });
//                 // this.room.onMessage("add-media", (message) => {
//                 //     const { mediaId, mediaType, settings, x, y, z, rx, ry, rz, sx, sy, sz } = message;
//                 //     this.gameController.mediaManager.set(mediaId, mediaType, settings, x, y, z, rx, ry, rz, sx, sy, sz);
//                 // });
//                 // this.room.onMessage("remove-media", (message) => {
//                 //     const { mediaId } = message;
//                 //     this.gameController.mediaManager.remove(mediaId);
//                 // });
//                 // this.room.onMessage("reset-scene", (message) => {
//                 //     for (const [key, vox] of this.gameController.voxelManager._voxels.entries()) {
//                 //         if (vox.active && !(vox.x === 8 && vox.y === 0 && vox.z === 8)) {
//                 //             this.gameController.voxelManager.set(vox.x, vox.y, vox.z, null);
//                 //         }
//                 //     }
//                 //     for (const [key] of this.gameController.mediaManager._media.entries()) {
//                 //         this.gameController.mediaManager.remove(key);
//                 //     }
//                 // });
//                 this.room.onLeave((code) => {
//                     this.options.debug && this.log(`Left, id:${id} code =>`, code);
//                     this.onDisconnect(id, handleReconnection);
//                 });
//                 this.room.onError((code) => {
//                     this.options.debug && this.log(`Error, id:${id} code =>`, code);
//                 });
//             }
//             return this.room;
//         } catch (e: any) {
//             this.onDisconnect(id, handleReconnection);
//             this.log(`Auth error: ${e.message}`);
//             return null;
//         }
//     }

//     onConnected(id: string) {
//         this.options.debug && this.log(`Connected to socket server (id:${id})`);
//         this.attempts = 0;
//     }

//     onDisconnect(id: string, reconnect: () => void) {
//         this.options.debug && this.log(`Disconnected from socket server (id:${id})`);
//         reconnect();
//     }

//     log(...args: any[]) {
//         console.log(`[ GameClient ]`, ...args)
//     }
// }

// export enum API_ENDPOINTS {
//     PROD = "wss://dcl-voxel-api.herokuapp.com",
//     DEV = "ws://localhost:4250",
// }
// export class GameController {
//     client: GameClient = new GameClient()
//     constructor(){
//         this.client.setConfig({
//             endpoint: API_ENDPOINTS.PROD,
//             sceneOwner: "0xd689478d44A438798EE0DC07657CcE2135c0AeF7", //Add your eth addy
//             nickname: "default", //Default scene name that loads on first load
//             debug: true,
//         })
//     }
// }