import { GlobalFonts as CanvasGlobalFonts } from '@napi-rs/canvas';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const registeredFontNames: string[] = ['GoogleSans'];

function buildGlobalFonts(): string {
  const quoted = registeredFontNames.map((n) => `"${n}"`).join(', ');
  return `${quoted}, sans-serif`;
}

export let GlobalFonts = buildGlobalFonts();

export function registerFont(fontPath: string, fontName: string): void {
  const candidates: string[] = [];

  if (path.isAbsolute(fontPath)) candidates.push(fontPath);

  candidates.push(path.join(__dirname, '../Fonts', fontPath));
  candidates.push(path.join(process.cwd(), 'Fonts', fontPath));
  candidates.push(path.resolve(process.cwd(), fontPath));

  let found: string | undefined;
  for (const p of candidates) {
    try {
      if (fs.existsSync(p)) {
        found = p;
        break;
      }
    } catch (e) {
    }
  }

  if (!found) {
    throw new Error(`Font file not found at any of: ${candidates.join(', ')}`);
  }

  CanvasGlobalFonts.registerFromPath(found, fontName as any);

  if (!registeredFontNames.includes(fontName)) {
    registeredFontNames.push(fontName);
    GlobalFonts = buildGlobalFonts();
  }
}

export function initializeFonts(): void {
  try {
    registerFont('GoogleSans.ttf', 'GoogleSans');
  } catch (e) {
    throw e;
  }
}