// This is a temporary playground to see what kinds of Material based utilities would be
// nice to have in the next version of DCLDash.

import { engine, Entity, Material, MaterialTransparencyMode, PBMaterial_PbrMaterial, Schemas, TextureFilterMode, TextureUnion } from '@dcl/sdk/ecs'
import { Color3 } from '@dcl/sdk/math'

export const PulsateEmissionComponent = engine.defineComponent('PulsateEmissionComponent', {
	timer: Schemas.Optional(Schemas.Number),
  speed: Schemas.Number,
  min: Schemas.Number,
  max: Schemas.Number
},{
	timer: 0,
	speed: 3,
	min: .5,
	max: 1,
})

enum MaterialTweenType {
	EmissionIntensity,
	EmissiveColor
}

interface MaterialTweenSettings {
	type: MaterialTweenType,

}

class Materialize_Instance {
	private queue: any[] = []
	public hologramTexture(
		src: string,
		startColor = Color3.create(0,.5,.5),
		emissiveIntensity = 100
	): PBMaterial_PbrMaterial{

		const _texture = Material.Texture.Common({
			src,
			filterMode: TextureFilterMode.TFM_POINT
		})

		return {
			emissiveTexture: _texture,
			alphaTexture: _texture,
			transparencyMode: MaterialTransparencyMode.MTM_ALPHA_BLEND,
			emissiveColor: startColor,
			texture: _texture,
			emissiveIntensity,
			castShadows: false,
		}
    }
	pulsateEmissiveColor(){

	}
	pulsateEmission(){

	}

	system(dt: number){
		if(this.queue.length) engine.removeSystem(this.system)
	}
}
export const Materialize = new Materialize_Instance()


