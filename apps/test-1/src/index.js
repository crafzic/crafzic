import fs from "fs";
import ffmpegStatic from "ffmpeg-static";
import ffmpeg from "fluent-ffmpeg";
import { Canvas, loadImage, registerFont } from "canvas";
import { stitchFramesToVideo } from "./utils/stitchFramesToVideo.js";
import { interpolateKeyframes } from "./utils/interpolateKeyframes.js";

// Tell fluent-ffmpeg where it can find FFmpeg
ffmpeg.setFfmpegPath(ffmpegStatic);

// Clean up the temporary directories first
for (const path of ["out", "tmp/output"]) {
  if (fs.existsSync(path)) {
    await fs.promises.rm(path, { recursive: true });
  }
  await fs.promises.mkdir(path, { recursive: true });
}

const canvas = new Canvas(1280, 720);
const context = canvas.getContext("2d");

const logo = await loadImage("assets/logo.svg");

// The video length and frame rate, as well as the number of frames required
// to create the video
const duration = 3;
const frameRate = 60;
const frameCount = Math.floor(duration * frameRate);

// Render each frame
for (let i = 0; i < frameCount; i++) {
  const time = i / frameRate;

  console.log(
    `Rendering frame ${i} at ${Math.round(time * 10) / 10} seconds...`
  );

  // Clear the canvas with a white background color. This is required as we are
  // reusing the canvas with every frame
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);

  renderFrame(context, duration, time);

  // Store the image in the directory where it can be found by FFmpeg
  const output = canvas.toBuffer("image/png");
  const paddedNumber = String(i).padStart(4, "0");
  await fs.promises.writeFile(`tmp/output/frame-${paddedNumber}.png`, output);
}

// Stitch all frames together with FFmpeg
await stitchFramesToVideo(
  "tmp/output/frame-%04d.png",
  "assets/catch-up-loop-119712.mp3",
  "out/video.mp4",
  duration,
  frameRate
);

function renderFrame(context, duration, time) {
  // Calculate the progress of the animation from 0 to 1
  let t = time / duration;
  t = applyCubicInOutEasing(t);
  // Draw the image from left to right over a distance of 550 pixels
  context.drawImage(logo, 100 + t * 550, 100, 500, 500);
  const x = interpolateKeyframes(
    [
      // At time 0, we want x to be 100
      { time: 0, value: 100 },
      // At time 1.5, we want x to be 550 (using Cubic easing)
      { time: 1.5, value: 550, easing: "cubic-in-out" },
      // At time 3, we want x to be 200 (using Cubic easing)
      { time: 3, value: 200, easing: "cubic-in-out" },
    ],
    time
  );
}
function applyCubicInOutEasing(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
