import { Config, DefaultRenderer, Text } from "@crafzic/crafzic-image";

async function main() {
  const config = new Config({
    height: 720,
    width: 1280,
    backgroundColor: "#fff",
  });
  const renderer = new DefaultRenderer(config).setColor("#fff");
  const text = new Text(config)
    .setFontSize(20)
    .setText("Hello World!")
    .setColor("#ff0000")
    .setTextPosition({
      textAlign: "start",
      textBaseline: "bottom",
    });
  renderer.addText(text);
  await renderer.render();
}

main();
