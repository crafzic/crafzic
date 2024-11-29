import { POSITION } from 'src/constants/constant'

export type ElementPositionType =
  | {
      position: POSITION
    }
  | {
      position?: undefined | null
      x: number
      y: number
    }
