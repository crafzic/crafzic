# Crafzic Image render

# image render for the node js environment built with skia-canvas

## Example

```js
import {
  Config,
  DefaultRenderer,
  POSITION,
  Text,
} from "@crafzic/crafzic-image";
const config = new Config({
  height: 720,
  width: 1280,
  backgroundColor: "#fff",
});
const text = new Text(config)
  .setFontSize(80)
  .setText("Hello World!")
  .setColor("#ff0000");
renderer.addText(text);
```
<img width="720" alt="rainbox" src="https://github.com/user-attachments/assets/7b3d1a6e-3743-4901-b29d-f45080f658ba">

```ts
import {
  Config,
  DefaultRenderer,
  POSITION,
  Text,
} from "@crafzic/crafzic-image";

async function main() {
  const config = new Config({
    height: 720,
    width: 1280,
    backgroundColor: "#fff00",
  });
  const renderer = new DefaultRenderer(config).setColor("#000");
  const text = new Text(config)
    .setFontSize(80)
    .setText("Hello World!")
    .setColor("#ff0000");
  const text2 = new Text(config)
    .setFontSize(40)
    .setText("Random")
    .setColor("#ff3002")
    .setPosition({
      position: POSITION.TOP_LEFT,
    });
  const text3 = new Text(config)
    .setFontSize(40)
    .setText("Text")
    .setColor("#ff3002")
    .setPosition({
      position: POSITION.TOP_RIGHT,
    });
  const text4 = new Text(config)
    .setFontSize(40)
    .setText("IS")
    .setColor("#ff3002")
    .setPosition({
      position: POSITION.BOTTOM_LEFT,
    });
  const text5 = new Text(config)
    .setFontSize(40)
    .setText("Everywhere !")
    .setColor("#ff3002")
    .setPosition({
      position: POSITION.BOTTOM_RIGHT,
    });

  renderer
    .addText(text)
    .addText(text2)
    .addText(text3)
    .addText(text5)
    .addText(text4);
  await renderer.render();
}

main();
```

![image](https://github.com/user-attachments/assets/585625f8-b092-45b1-8bac-2eaee473ba6b)
