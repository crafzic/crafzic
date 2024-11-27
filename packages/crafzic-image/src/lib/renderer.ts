import fs from "fs";
import { Canvas, CanvasRenderingContext2D } from "canvas";
import { Text } from "./text";
import { RendererColorGradient, RendererColorPattern } from "../types";
import { configManager } from "../config/library-config";

export type RendererConstructorType = {
  color?: string | RendererColorGradient | RendererColorPattern;
  outputFilepath: string;
  height?: number;
  width?: number;
};

export class Renderer {
  private canvas: Canvas;
  private ctx: CanvasRenderingContext2D;
  private outputFilepath;
  private textList: Text[] = [];

  constructor({
    height = 720,
    width = 1280,
    color = "#ffffff",
    outputFilepath = "out",
  }: RendererConstructorType) {
    configManager.setConfig({
      imageColor: color,
      imageHeight: height,
      imageWidth: width,
    });
    this.canvas = new Canvas(width, height);
    this.ctx = this.canvas.getContext("2d")!;
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, width, height);
    this.outputFilepath = outputFilepath;
  }
  private renderFrame() {
    for (const textItem of this.textList) {
      const {
        x,
        y,
        color,
        fontSize,
        text,
        textAlign,
        textBaseline,
        fontWeight,
      } = textItem._getProperties({
        width: this.canvas.width,
        height: this.canvas.height,
      });

      this.ctx.font = `${fontWeight} ${fontSize}px Arial`;
      this.ctx.fillStyle = "#000000";
      this.ctx.textBaseline = textBaseline;
      this.ctx.textAlign = textAlign;
      this.ctx.fillStyle = color;
      this.ctx.fillText(text, x, y);
    }
  }
  addText(textInstance: Text): this {
    this.textList.push(textInstance);
    return this;
  }

  async render() {
    if (fs.existsSync(this.outputFilepath)) {
      await fs.promises.rm(this.outputFilepath, { recursive: true });
    }
    await fs.promises.mkdir(this.outputFilepath, { recursive: true });

    console.log("Rendering image...");

    this.renderFrame();
    const output = this.canvas.toBuffer("image/png");
    await fs.promises.writeFile(`${this.outputFilepath}/image.png`, output);
  }
}
