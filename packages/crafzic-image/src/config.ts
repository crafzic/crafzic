export type ConfigClassType = {
  width: number
  height: number
  backgroundColor: string
}

export class Config {
  private _width: number
  private _height: number

  constructor(config: ConfigClassType) {
    this._width = config.width
    this._height = config.height
  }
  get width(): number {
    return this._width
  }
  get height(): number {
    return this._height
  }
}
