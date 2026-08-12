import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createCanvas, loadImage } from "@napi-rs/canvas";
import { Bloom, Calm, Haze, initializeFonts } from "../dist/index.js";

const filePath = fileURLToPath(import.meta.url);
const directory = path.dirname(filePath);
const outputDirectory = path.resolve(directory, "../docs/assets");

fs.mkdirSync(outputDirectory, { recursive: true });
initializeFonts();

function createOriginalArtwork() {
  const canvas = createCanvas(900, 900);
  const context = canvas.getContext("2d");

  context.fillStyle = "#081421";
  context.fillRect(0, 0, 900, 900);

  const glow = context.createRadialGradient(450, 430, 40, 450, 430, 560);
  glow.addColorStop(0, "#0D7773");
  glow.addColorStop(0.55, "#0B4F57");
  glow.addColorStop(1, "#081421");
  context.fillStyle = glow;
  context.fillRect(0, 0, 900, 900);

  context.strokeStyle = "rgba(214, 176, 92, 0.62)";
  context.lineWidth = 5;
  for (let radius = 180; radius <= 540; radius += 90) {
    context.beginPath();
    context.arc(450, 450, radius, Math.PI, 2 * Math.PI);
    context.stroke();
  }

  context.strokeStyle = "rgba(234, 241, 239, 0.35)";
  context.lineWidth = 2;
  for (let x = 105; x <= 795; x += 115) {
    for (let y = 135; y <= 760; y += 120) {
      context.save();
      context.translate(x, y);
      context.rotate(Math.PI / 4);
      context.strokeRect(-32, -32, 64, 64);
      context.restore();
    }
  }

  context.fillStyle = "#D6B05C";
  context.beginPath();
  context.arc(450, 450, 86, 0, Math.PI * 2);
  context.fill();

  context.fillStyle = "#081421";
  context.beginPath();
  context.arc(450, 450, 52, 0, Math.PI * 2);
  context.fill();

  return canvas.toBuffer("image/png");
}

function drawLabel(context, value, x, y) {
  context.fillStyle = "#EAF1EF";
  context.font = "700 26px Arial";
  context.fillText(value.toUpperCase(), x, y);
}

const artwork = createOriginalArtwork();
const shared = {
  albumArt: artwork,
  fallbackArt: artwork,
  backgroundColor: "#081421",
  timeAdjust: { timeStart: "0:45", timeEnd: "4:42" },
  progressBar: 16,
};

const examples = [
  {
    label: "NOW PLAYING · Surah Ar-Rahman",
    fileName: "quran-recitation-now-playing.png",
    render: Bloom,
    options: {
      ...shared,
      type: "nowPlaying",
      trackName: "Surah Ar-Rahman",
      artistName: "Mishary Rashid Alafasy",
    },
  },
  {
    label: "START · Surah Al-Kahf",
    fileName: "quran-recitation-start.png",
    render: Haze,
    options: {
      ...shared,
      type: "start",
      trackName: "Surah Al-Kahf",
      artistName: "Maher Al-Muaiqly",
    },
  },
  {
    label: "ADD TO QUEUE · Surah Al-Kahf",
    fileName: "quran-recitation-queue.png",
    render: Calm,
    options: {
      ...shared,
      type: "add",
      trackName: "Surah Al-Kahf",
      artistName: "Maher Al-Muaiqly",
      likes: 1_200,
      views: 54_000,
      position: 2,
    },
  },
];

const renderedCards = [];
for (const example of examples) {
  const image = await example.render(example.options);
  const destination = path.join(outputDirectory, example.fileName);
  fs.writeFileSync(destination, image);
  renderedCards.push({ ...example, image });
}

const firstCard = await loadImage(renderedCards[0].image);
const cardWidth = 1000;
const cardHeight = Math.round((firstCard.height / firstCard.width) * cardWidth);
const margin = 72;
const headerHeight = 138;
const sheet = createCanvas(
  cardWidth + margin * 2,
  headerHeight + (cardHeight + margin) * renderedCards.length,
);
const sheetContext = sheet.getContext("2d");

sheetContext.fillStyle = "#081421";
sheetContext.fillRect(0, 0, sheet.width, sheet.height);
sheetContext.fillStyle = "#D6B05C";
sheetContext.fillRect(0, 0, sheet.width, 10);
sheetContext.fillStyle = "#EAF1EF";
sheetContext.font = "700 40px Arial";
sheetContext.fillText("QURAN RECITATION · EVENT CARD EXAMPLES", margin, 62);
sheetContext.fillStyle = "#A7B0B7";
sheetContext.font = "400 22px Arial";
sheetContext.fillText(
  "Original abstract artwork · External videos are linked in the README",
  margin,
  98,
);

for (const [index, example] of renderedCards.entries()) {
  const image = await loadImage(example.image);
  const y = headerHeight + index * (cardHeight + margin);
  drawLabel(sheetContext, example.label, margin, y + 30);
  sheetContext.drawImage(image, margin, y + 52, cardWidth, cardHeight);
}

fs.writeFileSync(
  path.join(outputDirectory, "quran-recitation-examples.png"),
  sheet.toBuffer("image/png"),
);
console.log(
  `Generated ${renderedCards.length} standalone cards and one documentation sheet in ${outputDirectory}`,
);
