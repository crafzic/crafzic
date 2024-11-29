import { POSITION } from 'src/constants/constant'

const findPosition = ({
  position,
  width,
  height,
}: {
  position: POSITION
  width: number
  height: number
}) => {
  switch (position) {
    case POSITION.CENTER:
      return { x: width / 2, y: height / 2 }
    case POSITION.TOP_LEFT:
      return { x: 0, y: 0 }
    case POSITION.TOP_RIGHT:
      return { x: width, y: 0 }
    case POSITION.BOTTOM_LEFT:
      return { x: 0, y: height }
    case POSITION.BOTTOM_RIGHT:
      return { x: width, y: height }
    default:
      return { x: width / 2, y: height / 2 }
  }
}

export default findPosition
