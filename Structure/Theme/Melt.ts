import generateSvg from '../Functions/GenerateSvg.js';
import { cropImage } from 'cropify';
import { createCanvas, loadImage } from '@napi-rs/canvas';
import { MeltBS } from './BaseStructure.js';
import { GlobalFonts } from '../fonts.js';

export type MeltOptions = {
  albumArt: string | Buffer;
  fallbackArt: string;
  artistName: string;
  trackName: string;
  timeAdjust?: { timeStart: string; timeEnd: string };
  progressBar?: number;
  volumeBar?: number;
  styleConfig?: {
    artistStyle?: { textColor?: string; textItalic?: boolean; textGlow?: boolean };
    trackStyle?: { textColor?: string; textItalic?: boolean; textGlow?: boolean };
    timeStyle?: { textColor?: string; textItalic?: boolean };
    progressBarStyle?: { barColor: string; barColorDuo?: boolean };
    volumeBarStyle?: { barColor: string; barColorDuo?: boolean };
    explicitStyle?: { iconColor?: string; iconOpacity?: number };

  };
  isExplicit?: boolean;
  backgroundColor?: string;
};

export const Melt = async ({
  albumArt,
  fallbackArt,
  artistName = "Unknown Artist",
  trackName = "Unknown Track",
  timeAdjust: { timeStart, timeEnd } = { timeStart: '0:00', timeEnd: '0:00' },
  progressBar = 0,
  volumeBar = 0,
  styleConfig: {
    artistStyle = { textColor: 'white', textItalic: false, textGlow: false },
    trackStyle = { textColor: 'white', textItalic: false, textGlow: false },
    timeStyle = { textColor: 'white', textItalic: false },
    progressBarStyle = { barColor: 'white', barColorDuo: false },
    volumeBarStyle = { barColor: 'white', barColorDuo: false },
    explicitStyle = { iconColor: 'white', iconOpacity: 48 },
  } = {},
  isExplicit = false,
  backgroundColor = 'black',
}: MeltOptions): Promise<Buffer> => {
  const structure = generateSvg(
    MeltBS({
      isExplicit,
      progressBar,
      progressBarStyle,
      volumeBar,
      volumeBarStyle,
      backgroundColor,
      explicitColor: explicitStyle.iconColor,
      explicitOpacity: (explicitStyle.iconOpacity || 48) / 100,
    }),
  );

  const canvas = createCanvas(1415, 477);
  const context = canvas.getContext('2d');

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

  context.font = `${artistStyle.textItalic ? 'italic' : 'normal'} 35px ${GlobalFonts}`;
  context.fillStyle = artistStyle.textColor || 'white';

  if (artistStyle.textGlow) {
    context.shadowColor = artistStyle.textColor || 'white';
    context.shadowBlur = 30;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
  }

  if (isExplicit) {
    context.fillText(artistName, 695, 235);
  } else {
    context.fillText(artistName, 634, 235);
  }

  context.font = `${trackStyle.textItalic ? 'italic' : 'normal'} 800 55px ${GlobalFonts}`;
  context.fillStyle = trackStyle.textColor || 'white';

  if (trackStyle.textGlow) {
    context.shadowColor = trackStyle.textColor || 'white';
    context.shadowBlur = 40;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
  }

  context.fillText(trackName, 634, 170);

  context.shadowColor = 'transparent';
  context.shadowBlur = 0;
  context.shadowOffsetX = 0;
  context.shadowOffsetY = 0;

  context.font = `${timeStyle.textItalic ? 'italic' : 'normal'} 25px ${GlobalFonts}`;
  context.fillStyle = timeStyle.textColor || 'white';

  context.textAlign = 'left';
  context.textBaseline = 'middle';
  context.fillText(timeStart, 634, 340);

  context.textAlign = 'right';
  context.fillText(timeEnd, 1215, 340);
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

export default Melt;