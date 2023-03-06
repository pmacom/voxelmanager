import { AudioSource, AvatarAnchorPointType, AvatarAttach, engine, Entity } from "@dcl/sdk/ecs"
import { sample } from "lodash"

const GLOBAL_AUDIO_ENTITY = engine.addEntity()
AvatarAttach.create(GLOBAL_AUDIO_ENTITY,{
  anchorPointId: AvatarAnchorPointType.AAPT_NAME_TAG,
})

export const Audio_PlayOnce = (src: string, entity?: Entity) => {
  if(!entity) entity = GLOBAL_AUDIO_ENTITY
  AudioSource.createOrReplace(entity, {
    audioClipUrl: src,
    loop: false,
    playing: true
  })
}

export const Audio_PlayOnce_Random = (srcs: string[], entity?: Entity) => {
  if(!entity) entity = GLOBAL_AUDIO_ENTITY
  const src: string = sample(srcs) as string
  AudioSource.createOrReplace(entity, {
    audioClipUrl: src,
    loop: false,
    playing: true
  })
}