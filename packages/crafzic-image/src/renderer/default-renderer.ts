import { Canvas, CanvasRenderingContext2D } from 'skia-canvas'
import { Config } from '../config'
import { Text } from '../lib/text'
export class DefaultRenderer {
  private _config: Config
  private _canvas: Canvas
  private _ctx: CanvasRenderingContext2D
  private _color: string
  private _textItems: Text[] = []
  constructor(config: Config) {
    this._config = config
    this._canvas = new Canvas(this._config.width, this._config.height)
    this._ctx = this._canvas.getContext('2d')
    this._color = '#ffffff'
  }

  setColor(color: string): this {
    this._color = color
    this._ctx.fillStyle = this._color
    this._ctx.fillRect(0, 0, this._config.width, this._config.height)
    return this
  }

  addText(text: Text): this {
    this._textItems.push(text)
    return this
  }

  private drawFrame() {
    for (const text of this._textItems) {
      const props = text._properties()
      console.log(props)

      this._ctx.font = `${props.fontSize}px Arial`
      this._ctx.fillStyle = props.color
      this._ctx.fillText(props.text, props.x, props.y)
      this._ctx.textAlign = props.textAlign
      this._ctx.textBaseline = props.textBaseline
    }
  }
  async render(): Promise<void> {
    this.drawFrame()
    await this._canvas.saveAs('rainbox.png', { density: 2 })
  }
}
