import { engine } from "@dcl/sdk/ecs"
import { Color4 } from "@dcl/sdk/math"
import ReactEcs, { Button, Dropdown, Input, Label, TextAlignType, UiEntity } from "@dcl/sdk/react-ecs"

let dt = 0
engine.addSystem((d) => {
  dt = d
})

export const ui = () => {
    return (
      <UiEntity
        uiTransform={{
          width: '100%',
          height: 300,
          margin: { left: 500 },
          padding: { top: 10, right: 10, bottom: 10, left: 10 },
        }}
        uiBackground={{ color: { r: 1, g: 1, b: 1, a: 0.8 } }}
      >
        <Button
          variant="primary"
          value="Click me!"
          uiTransform={{ width: 200, height: 100 }}
          fontSize={30}
          onMouseDown={()=>{ console.log('CLICKED!')}}
          onMouseUp={()=>{ console.log('CLICKED!')}}
        />

        <Dropdown
          options={['Red', 'Blue']}
          color={Color4.Red()}
          font="sans-serif"
          fontSize={30}
          selectedIndex={0}
          uiTransform={{ width: 300, height: 100 }}
          onChange={(index) => { console.log('Changed', index)}}
        />

        <Input
            placeholder="Please enter your email"
            fontSize={30}
            onChange={(value: string) => {
             console.log('Changed the input to be', value)
            }}
            uiBackground={{ color: Color4.Red() }}
            uiTransform={{ width: 300, height: 100, padding: 0 }}
          />
        <Label
          uiTransform={{ width: 1000, height: 200 }}
          value={"Delta time:" + dt.toFixed(4)}
          textAlign={'bottom-center'}
          fontSize={30}
          color={Color4.Black()}
          font={'sans-serif'}
          uiBackground={{ color: { r: 1, g: 0.45, b: 0.85, a: 1 } }}
        />
      </UiEntity>
    )
}