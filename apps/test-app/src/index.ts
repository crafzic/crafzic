import { POSITION, Renderer, Text } from "@crafzic/crafzic-image";

async function hello() {
  const renderer = new Renderer({
    outputFilepath: "./out",
    color: "rgba(0,0,0,0.4)",
    height: 1080,
    width: 1920,
  });
  const text1 = new Text("Hello, World !")
    .setColor("#ff0000")
    .setPosition(POSITION.CENTER)
    .setFontSize(100)
    .setFontWeight(700);

  const text2 = new Text("This is a test")
    .setColor("#C28E85")
    .setFontWeight(600)
    .setFontSize(60)
    .below(text1, 50);

  renderer.addText(text1).addText(text2);
  await renderer.render();
}

hello();
