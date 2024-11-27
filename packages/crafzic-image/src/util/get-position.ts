import { POSITION } from "src/constant/constant";

type GET_POSITION_TYPE = {
  position: POSITION;
  width: number;
  height: number;
};
export default function getPosition({
  position,
  width,
  height,
}: GET_POSITION_TYPE): {
  x: number;
  y: number;
} {
  switch (position) {
    case POSITION.CENTER:
      console.log("center");
      return { x: width / 2, y: height / 2 };
    case POSITION.TOP_LEFT:
      return { x: 0, y: 0 };
    case POSITION.TOP_RIGHT:
      return { x: width, y: 0 };
    case POSITION.BOTTOM_LEFT:
      return { x: 0, y: height };
    case POSITION.BOTTOM_RIGHT:
      return { x: width, y: height };
    default:
      return { x: width / 2, y: height / 2 };
  }
}
