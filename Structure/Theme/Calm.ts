import generateSvg from '../Functions/GenerateSvg.js';
import { cropImage } from 'cropify';
import { createCanvas, loadImage } from '@napi-rs/canvas';
import { CalmBS } from './BaseStructure.js';
import { GlobalFonts } from '../fonts.js';

export type CalmOptions = {
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
};

export const Calm = async ({
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
}: CalmOptions): Promise<Buffer> => {
  const structure = generateSvg(
    CalmBS({
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

  const canvas = createCanvas(1415, 380);
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
  context.drawImage(bgImage, 0, 0, 1415, 380);
  context.filter = 'none';

  context.drawImage(await loadImage(structure), 0, 0);

  context.textAlign = 'center';
  context.textBaseline = 'middle';

  context.font = `${artistStyle.textItalic ? 'italic' : 'normal'} 35px ${GlobalFonts}`;
  context.fillStyle = artistStyle.textColor || 'white';

  if (artistStyle.textGlow) {
    context.shadowColor = artistStyle.textColor || 'white';
    context.shadowBlur = 30;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
  }

  context.fillText(artistName, 700, 180);

  context.font = `${trackStyle.textItalic ? 'italic' : 'normal'} 800 50px ${GlobalFonts}`;
  context.fillStyle = trackStyle.textColor || 'white';

  if (trackStyle.textGlow) {
    context.shadowColor = trackStyle.textColor || 'white';
    context.shadowBlur = 40;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
  }

  context.fillText(trackName, 700, 110);

  context.shadowColor = 'transparent';
  context.shadowBlur = 0;
  context.shadowOffsetX = 0;
  context.shadowOffsetY = 0;

  context.font = `${timeStyle.textItalic ? 'italic' : 'normal'} 25px ${GlobalFonts}`;
  context.fillStyle = timeStyle.textColor || 'white';

  context.textAlign = 'right';
  context.textBaseline = 'middle';
  context.fillText(timeStart, 400, 270);

  context.textAlign = 'left';
  context.fillText(timeEnd, 1015, 270);
  context.textAlign = 'start';
  context.textBaseline = 'alphabetic';

  const croppedImage = await cropImage({
    imagePath: canvas.toBuffer('image/png') as any,
    width: 1415,
    height: 380,
    borderRadius: 210,
  });

  return croppedImage as Buffer;
};

export default Calm;
