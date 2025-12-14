import generateSvg from '../Functions/GenerateSvg.js';
import { cropImage } from 'cropify';
import { createCanvas, loadImage } from '@napi-rs/canvas';
import { BloomBS } from './BaseStructure.js';
import { GlobalFonts } from '../fonts.js';

export type BloomOptions = {
  albumArt: string | Buffer;
  fallbackArt: string;
  artistName: string;
  trackName: string;
  timeAdjust?: { timeStart: string; timeEnd: string };
  progressBar?: number;
  styleConfig?: {
    artistStyle?: { textColor?: string; textItalic?: boolean; textGlow?: boolean };
    trackStyle?: { textColor?: string; textItalic?: boolean; textGlow?: boolean };
    timeStyle?: { textColor?: string; textItalic?: boolean };
    progressBarStyle?: { barColor: string; barColorDuo?: boolean };
  };
  isExplicit?: boolean;
};

export const Bloom = async ({
  albumArt,
  fallbackArt,
  artistName = "Unknown Artist",
  trackName = "Unknown Track",
  timeAdjust: { timeStart, timeEnd } = { timeStart: '0:00', timeEnd: '0:00' },
  progressBar = 0,
  styleConfig: {
    artistStyle = { textColor: 'white', textItalic: false, textGlow: false },
    trackStyle = { textColor: 'white', textItalic: false, textGlow: false },
    timeStyle = { textColor: 'white', textItalic: false },
    progressBarStyle = { barColor: 'white', barColorDuo: false },
  } = {},
  isExplicit = false,
}: BloomOptions): Promise<Buffer> => {
  const structure = generateSvg(
    BloomBS({
      isExplicit,
      progressBar,
      progressBarStyle,
    }),
  );

  if (artistName.length > 30) {
    artistName = artistName.substring(0, 27) + '...';
  }

  if (trackName.length > 30) {
    trackName = trackName.substring(0, 27) + '...';
  }

  const canvas = createCanvas(1415, 477);
  const context = canvas.getContext('2d');

  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.filter = 'blur(60px) opacity(0.6)';
  let bgImage;
  try {
    bgImage = await loadImage(
      await cropImage({
        imagePath: albumArt as any,
        width: 1415,
        height: 477,
        borderRadius: 110,
      })
    );
  } catch (e) {
    bgImage = await loadImage(
      await cropImage({
        imagePath: fallbackArt as any,
        width: 1415,
        height: 477,
        borderRadius: 110,
      })
    );
  }
  context.drawImage(bgImage, -100, -100, 1615, 677);
  context.filter = 'none';

  context.drawImage(await loadImage(structure), 0, 0);

  let artImage;
  try {
    artImage = await loadImage(
      await cropImage({
        imagePath: albumArt as any,
        width: 397,
        height: 397,
        borderRadius: 110,
      })
    );
  } catch (e) {
    artImage = await loadImage(
      await cropImage({
        imagePath: fallbackArt as any,
        width: 397,
        height: 397,
        borderRadius: 110,
      })
    );
  }
  context.drawImage(artImage, 40, 40, 397, 397);

  context.font = `${artistStyle.textItalic ? 'italic' : 'normal'} 40px ${GlobalFonts}`;
  context.fillStyle = artistStyle.textColor || 'white';

  if (artistStyle.textGlow) {
    context.shadowColor = artistStyle.textColor || 'white';
    context.shadowBlur = 30;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
  }

  if (isExplicit) {
    context.fillText(artistName, 600, 222);
  } else {
    context.fillText(artistName, 530, 222);
  }

  context.font = `${trackStyle.textItalic ? 'italic' : 'normal'} 800 55px ${GlobalFonts}`;
  context.fillStyle = trackStyle.textColor || 'white';

  if (trackStyle.textGlow) {
    context.shadowColor = trackStyle.textColor || 'white';
    context.shadowBlur = 40;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
  }

  context.fillText(trackName, 530, 150);

  context.shadowColor = 'transparent';
  context.shadowBlur = 0;
  context.shadowOffsetX = 0;
  context.shadowOffsetY = 0;

  context.font = `${timeStyle.textItalic ? 'italic' : 'normal'} 30px ${GlobalFonts}`;
  context.fillStyle = timeStyle.textColor || 'white';

  context.textAlign = 'left';
  context.textBaseline = 'middle';
  context.fillText(timeStart, 530, 370);

  context.textAlign = 'right';
  context.fillText(timeEnd, 1235, 370);

  context.textAlign = 'start';
  context.textBaseline = 'alphabetic';

  const croppedImage = await cropImage({
    imagePath: canvas.toBuffer('image/png') as any,
    width: 1415,
    height: 477,
    borderRadius: 140,
  });

  return croppedImage as Buffer;
};

export default Bloom;
