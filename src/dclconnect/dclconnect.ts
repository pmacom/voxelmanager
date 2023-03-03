import { Entity, ISchema, MapComponentDefinition, MapResult, Schemas } from '@dcl/sdk/ecs'

class DCLConnectInstance {
  public registeredComponents: Map<string, MapComponentDefinition<MapResult<any>>> = new Map()

  public registerComponent(component: MapComponentDefinition<MapResult<any>>){
    // Sends a request to the server to create this content type for storage
    // Checks to see if the user is permissioned
    const { componentName, schema } = component
    console.log('FINDME', { componentName, schema: schema.jsonSchema })

    const payload = {
      baseParcel: '-150,-150',
      // signature: '0x1234', // Check this eth address against dcl name server?
      component: { componentName, schema: schema.jsonSchema }
    }
    // When this API call comes back, we will get either a 200 or 400

    // GameServer State gets these values
    const gameServerRegisteredComponents = {
      '-150,-150': {
        'Transform': { ...schema },
        'VoxelComponent': { ...schema },
        'MeshRenderer': { ...schema },
        'LightSystem': { ...schema }
      }
    }
  }

  public create(uuid: string, components: MapComponentDefinition<MapResult<any>>[]) {
    components.forEach((component) => {
      const { componentName, schema } = component
    })
  }
}

export const DCLConnect = new DCLConnectInstance()
