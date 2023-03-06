import { engine } from "@dcl/sdk/ecs"
import { Color4 } from "@dcl/sdk/math"
import ReactEcs, { Button, Dropdown, Input, Label, TextAlignType, UiEntity } from "@dcl/sdk/react-ecs"
import { AppState } from "../app/state"

// let dt = 0
// engine.addSystem((d) => {
//   dt = d
// })

export const ui = () => {
    return (
      <UiEntity
        uiTransform={{
          width: '100%',
          height: 70,
          margin: { left: 500 },
          padding: { top: 10, right: 10, bottom: 10, left: 10 },
        }}
        uiBackground={{ color: { r: 1, g: 1, b: 1, a: 0.8 } }}
      >
        <Dropdown
          options={['View', 'Edit']}
          color={Color4.Black()}
          font="sans-serif"
          fontSize={25}
          selectedIndex={AppState.mode}
          uiTransform={{ width: 200, height: 50}}
          onChange={(index) => { AppState.mode = index}}
        />
        <Dropdown
          options={AppState.getVoxelTypeNames()}
          color={Color4.Black()}
          font="sans-serif"
          fontSize={25}
          selectedIndex={AppState.voxelType}
          uiTransform={{ width: 200, height: 50}}
          onChange={(index) => { AppState.voxelType = index }}
        />
        <Dropdown
          options={['Grass', 'Bedrock']}
          color={Color4.Black()}
          font="sans-serif"
          fontSize={25}
          selectedIndex={0}
          uiTransform={{ width: 200, height: 50}}
          onChange={(index) => { console.log('Changed', index)}}
        />
      </UiEntity>
    )
}