import { ElementPositionType } from 'src/@types/position'
import { Config } from '../config'
import { POSITION } from 'src/constants/constant'
import findPosition from 'src/util/find-position'
import { RendererTextAlign, RendererTextBaseline } from 'src/@types/text-align'

export class Text {
  private _config: Config
  private _text: string
  private _canvasWidth: number
  private _canvasHeight: number
  private _fontSize: number
  private _color: string
  private _text_baseline: RendererTextBaseline
  private _text_align: RendererTextAlign
  private _position: {
    x: number
    y: number
  }

  constructor(config: Config) {
    this._config = config
    this._canvasWidth = this._config.width
    this._canvasHeight = this._config.height
    this._text = ''
    this._fontSize = 20
    this._color = '#000000'

    const { x, y } = findPosition({
      position: POSITION.CENTER,
      width: this._canvasWidth,
      height: this._canvasHeight,
    })
    this._position = {
      x,
      y,
    }
    this._text_align = 'center'
    this._text_baseline = 'middle'
  }
  get text(): string {
    return this._text
  }

  setTextPosition({
    textAlign = 'center',
    textBaseline = 'middle',
  }: {
    textAlign?: CanvasTextAlign
    textBaseline?: CanvasTextBaseline
  }): this {
    this._text_align = textAlign
    this._text_baseline = textBaseline
    return this
  }
  setColor(color: string): this {
    this._color = color
    return this
  }

  _properties() {
    return {
      x: this._position.x,
      y: this._position.y,
      text: this._text,
      fontSize: this._fontSize,
      color: this._color,
      textBaseline: this._text_baseline,
      textAlign: this._text_align,
    }
  }

  setText(text: string): this {
    this._text = text
    return this
  }
  setPosition(position: ElementPositionType): this {
    if (position.position == undefined) {
      this._position = {
        x: position.x,
        y: position.y,
      }
    } else {
      const { x, y } = findPosition({
        position: position.position,
        width: this._canvasWidth,
        height: this._canvasHeight,
      })
      this.selectTextPosition(position.position)
      this._position = {
        x,
        y,
      }
    }
    return this
  }
  private selectTextPosition(pos: POSITION): this {
    switch (pos) {
      case POSITION.TOP_LEFT:
        this._text_baseline = 'top'
        this._text_align = 'left'
        break
      case POSITION.TOP_RIGHT:
        this._text_baseline = 'top'
        this._text_align = 'right'
        break
      case POSITION.BOTTOM_LEFT:
        this._text_baseline = 'bottom'
        this._text_align = 'left'
        break
      case POSITION.BOTTOM_RIGHT:
        this._text_baseline = 'bottom'
        this._text_align = 'right'
        break
      case POSITION.CENTER:
        this._text_baseline = 'middle'
        this._text_align = 'center'
        break
      default:
        break
    }

    return this
  }

  get position(): {
    x: number
    y: number
  } {
    return this._position
  }
  get fontSize(): number {
    return this._fontSize
  }
  setFontSize(fontSize: number): this {
    this._fontSize = fontSize
    return this
  }
  below(textInstance: Text, spacing: number): this {
    this._position.x = textInstance.position.x
    this._position.y = textInstance.position.y + textInstance.fontSize + spacing
    return this
  }
}
