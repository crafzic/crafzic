import { Config, DefaultRenderer, Text } from "@crafzic/crafzic-image";

async function main() {
  const config = new Config({
    height: 720,
    width: 1280,
    backgroundColor: "#fff",
  });
  const renderer = new DefaultRenderer(config).setColor("#000");
  const text = new Text(config)
    .setFontSize(80)
    .setText("Hello World!")
    .setColor("#ff0000");

  renderer.addText(text);
  await renderer.render();
}

main();
// import { Canvas } from "skia-canvas";

// let canvas = new Canvas(1280, 720),
//   ctx = canvas.getContext("2d"),
//   { width, height } = canvas;

// ctx = canvas.newPage();
// ctx.fillStyle = "white";
// ctx.fillRect(0, 0, width, height);
// ctx.fillStyle = "#ff0000";
// ctx.font = "20px Arial";
// ctx.textAlign = "center";
// ctx.textBaseline = "middle";
// ctx.fillText("Hello World!", 640, 360);
// ctx.fill();
// async function render() {
//   // save to a multi-page PDF file
//   await canvas.saveAs("all-pages.pdf");

//   // save to files named `page-01.png`, `page-02.png`, etc.
//   await canvas.saveAs("page-{2}.png");
// }
// render();

// import { Canvas } from "skia-canvas";

// let canvas = new Canvas(1280, 720),
//   ctx = canvas.getContext("2d"),
//   { width, height } = canvas;

// ctx = canvas.newPage();
// ctx.fillStyle = "white";
// ctx.fillRect(0, 0, width, height);
// ctx.fillStyle = "#ff0000";
// ctx.font = "20px Arial";
// ctx.textAlign = "center";
// ctx.textBaseline = "middle";
// ctx.fillText("Hello World!", 640, 360);
// ctx.fill();
// async function render() {
//   // save to a multi-page PDF file
//   await canvas.saveAs("all-pages.pdf");

//   // save to files named `page-01.png`, `page-02.png`, etc.
//   await canvas.saveAs("page-{2}.png");
// }
// render();
