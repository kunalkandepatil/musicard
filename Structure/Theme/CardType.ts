import type { SKRSContext2D } from '@napi-rs/canvas';
import { GlobalFonts } from '../fonts.js';

/**
 * Describes the bot event represented by a music card.
 *
 * `nowPlaying` preserves the original card layout. `start` and `add` replace
 * playback controls with a concise event-specific status.
 */
export type CardType = 'nowPlaying' | 'start' | 'add';

export type CardTypeOptions = {
  type?: CardType;
  likes?: number;
  views?: number;
  position?: number;
};

export type CardTypeDetailLayout = {
  x: number;
  y: number;
  maxWidth: number;
  color?: string;
  align?: CanvasTextAlign;
};

/**
 * Keeps JavaScript callers on the original behaviour when they provide an
 * unknown value, while TypeScript callers are constrained by `CardType`.
 */
export function normalizeCardType(type: CardType | undefined): CardType {
  return type === 'start' || type === 'add' ? type : 'nowPlaying';
}

export function showsPlaybackDetails(type: CardType): boolean {
  return type === 'nowPlaying';
}

function formatMetric(value: number | undefined): string | undefined {
  if (!Number.isFinite(value)) {
    return undefined;
  }

  const absoluteValue = Math.abs(value as number);
  const sign = (value as number) < 0 ? '-' : '';

  if (absoluteValue >= 1_000_000) {
    return `${sign}${(absoluteValue / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  }

  if (absoluteValue >= 1_000) {
    return `${sign}${(absoluteValue / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
  }

  return `${Math.trunc(value as number)}`;
}

function fitText(context: SKRSContext2D, text: string, maxWidth: number): string {
  if (context.measureText(text).width <= maxWidth) {
    return text;
  }

  const ellipsis = '…';
  let end = text.length;

  while (end > 0 && context.measureText(`${text.slice(0, end)}${ellipsis}`).width > maxWidth) {
    end -= 1;
  }

  return end > 0 ? `${text.slice(0, end)}${ellipsis}` : ellipsis;
}

/**
 * Draws the information that replaces time/progress controls for non-playing
 * cards. It deliberately uses only typography so the selected theme remains
 * visually intact.
 */
export function drawCardTypeDetails(
  context: SKRSContext2D,
  type: CardType,
  { x, y, maxWidth, color = 'white', align = 'left' }: CardTypeDetailLayout,
  { likes, views, position }: Pick<CardTypeOptions, 'likes' | 'views' | 'position'>,
): void {
  if (type === 'nowPlaying') {
    return;
  }

  context.save();
  context.fillStyle = color;
  context.textAlign = align;
  context.textBaseline = 'middle';
  context.font = `600 24px ${GlobalFonts}`;
  context.globalAlpha = 0.78;

  if (type === 'start') {
    context.fillText('STARTED', x, y);
    context.restore();
    return;
  }

  context.fillText('ADDED TO QUEUE', x, y);

  const metadata = [
    formatMetric(likes) ? `Likes ${formatMetric(likes)}` : undefined,
    formatMetric(views) ? `Views ${formatMetric(views)}` : undefined,
    Number.isFinite(position) ? `Queue #${Math.max(0, Math.trunc(position as number))}` : undefined,
  ].filter((item): item is string => Boolean(item));

  context.globalAlpha = 1;
  context.font = `400 23px ${GlobalFonts}`;
  const detail = metadata.length > 0 ? metadata.join('  ·  ') : 'Queued for playback';
  context.fillText(fitText(context, detail, maxWidth), x, y + 33);
  context.restore();
}
