import { engine, VideoPlayer } from "@dcl/sdk/ecs";

const entity = engine.addEntity()
VideoPlayer.create(entity, {
  loop: false,
  playbackRate: 1,
  playing: true,
  position: 0,
  src: 'https://emedia.dclconnect.io:5443/tests/streams/306620935338210568993876.mp4',
  volume: 1,
})

