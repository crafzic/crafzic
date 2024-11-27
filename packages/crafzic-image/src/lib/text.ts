import { configManager } from "../config/library-config";

import { ElementInterface } from "./interfaces/element-interface";
import { CanvasTextAlign, CanvasTextBaseline } from "canvas";
import { POSITION } from "src/constant/constant";
import { RendererColorGradient, RendererColorPattern } from "src/types";
import getPosition from "src/util/get-position";

type TextPositionType = {
  textBaseline: CanvasTextBaseline;
  textAlign: CanvasTextAlign;
};

export class Text implements ElementInterface {
  private text: string;
  private position?: POSITION = undefined;
  private x: number = 0;
  private y: number = 0;
  private color: string | RendererColorGradient | RendererColorPattern =
    "#000000";
  private fontSize: number = 20;
  private fontWeight: number = 400;
  private imageWidth: number = 0;
  private imageHeight: number = 0;
  constructor(text: string = "") {
    this.imageWidth = configManager.getConfig("imageWidth");
    this.imageHeight = configManager.getConfig("imageHeight");
    this.text = text;
  }
  getPosition(): { x: number; y: number } {
    console.log("x", this.x, "y", this.y);

    return {
      x: this.x,
      y: this.y,
    };
  }
  below(instance: ElementInterface, height: number): this {
    this.y = this.y + instance.getPosition().y + height;
    this.x = this.x + instance.getPosition().x;

    return this;
  }

  setFontWeight(fontWeight: number): this {
    this.fontWeight = fontWeight;
    return this;
  }
  setPosition(position: POSITION): this {
    this.position = position;
    const { x, y } = getPosition({
      position,
      width: this.imageWidth,
      height: this.imageHeight,
    });
    this.x = x;
    this.y = y;

    return this;
  }

  setCustomPosition({ x, y }: { x: number; y: number }): this {
    this.x = x;
    this.y = y;
    return this;
  }
  setFontSize(fontSize: number): this {
    this.fontSize = fontSize;
    return this;
  }
  setColor(color: string | RendererColorGradient | RendererColorPattern): this {
    this.color = color;
    return this;
  }
  setText(text: string) {
    this.text = text;
  }
  _getProperties({ width, height }: { width: number; height: number }) {
    const axis = this.getAxis({
      width: width,
      height: height,
    });

    return {
      x: axis.x,
      y: axis.y,
      text: this.text,
      color: this.color,
      fontSize: this.fontSize,
      textBaseline: this.getTextPosition().textBaseline,
      textAlign: this.getTextPosition().textAlign,
      fontWeight: this.fontWeight,
    };
  }

  private getAxis({ width, height }: { width: number; height: number }): {
    x: number;
    y: number;
  } {
    console.log("this.position", this.position);

    if (this.position == undefined) {
      return {
        x: this.x,
        y: this.y,
      };
    } else {
      return getPosition({ position: this.position, width, height });
    }
  }

  private getTextPosition(): TextPositionType {
    if (this.position == undefined) {
      return {
        textBaseline: "top",
        textAlign: "center",
      };
    } else {
      if (this.position === POSITION.TOP_LEFT) {
        return {
          textBaseline: "top",
          textAlign: "left",
        };
      }
      if (this.position === POSITION.TOP_RIGHT) {
        return {
          textBaseline: "top",
          textAlign: "right",
        };
      }
      if (this.position === POSITION.BOTTOM_LEFT) {
        return {
          textBaseline: "bottom",
          textAlign: "left",
        };
      }
      if (this.position === POSITION.BOTTOM_RIGHT) {
        return {
          textBaseline: "bottom",
          textAlign: "right",
        };
      }
      if (this.position === POSITION.CENTER) {
        return {
          textBaseline: "middle",
          textAlign: "center",
        };
      }
    }
    return {
      textBaseline: "top",
      textAlign: "center",
    };
  }
}
