import assert from 'node:assert/strict';
import test from 'node:test';
import { createCanvas } from '@napi-rs/canvas';
import { Bloom, Calm, Drift, Ease, Haze, Melt } from '../dist/index.js';
import {
  BloomBS,
  CalmBS,
  DriftBS,
  EaseBS,
  HazeBS,
  MeltBS,
} from '../dist/Theme/BaseStructure.js';
import {
  drawCardTypeDetails,
  normalizeCardType,
  showsPlaybackDetails,
} from '../dist/Theme/CardType.js';

const structures = [
  ['Bloom', BloomBS],
  ['Calm', CalmBS],
  ['Drift', DriftBS],
  ['Ease', EaseBS],
  ['Haze', HazeBS],
  ['Melt', MeltBS],
];

test('nowPlaying remains the default card type', () => {
  assert.equal(normalizeCardType(undefined), 'nowPlaying');
  assert.equal(normalizeCardType('nowPlaying'), 'nowPlaying');
  assert.equal(showsPlaybackDetails(normalizeCardType(undefined)), true);
});

test('only documented non-playing types alter card behaviour', () => {
  assert.equal(normalizeCardType('start'), 'start');
  assert.equal(normalizeCardType('add'), 'add');
  assert.equal(normalizeCardType('unsupported'), 'nowPlaying');
  assert.equal(showsPlaybackDetails('start'), false);
  assert.equal(showsPlaybackDetails('add'), false);
});

for (const [name, buildStructure] of structures) {
  test(`${name} keeps its progress block visible by default`, () => {
    const svg = buildStructure({ progressBar: 50, progressBarStyle: { barColor: '#fff' } });
    assert.match(svg, /<g opacity="1">/);
  });

  test(`${name} can hide its progress block for event cards`, () => {
    const svg = buildStructure({ progressBar: 50, progressBarStyle: { barColor: '#fff' }, showProgress: false });
    assert.match(svg, /<g opacity="0">/);
  });
}

test('Ease and Melt hide their supplemental volume controls for event cards', () => {
  const easeSvg = EaseBS({ progressBar: 50, progressBarStyle: { barColor: '#fff' }, showProgress: false });
  const meltSvg = MeltBS({ progressBar: 50, progressBarStyle: { barColor: '#fff' }, showProgress: false });

  assert.equal((easeSvg.match(/<g opacity="0">/g) || []).length, 3);
  assert.equal((meltSvg.match(/<g opacity="0">/g) || []).length, 2);
});

test('every public theme renders start and add cards', async () => {
  const artworkCanvas = createCanvas(120, 120);
  const artworkContext = artworkCanvas.getContext('2d');
  artworkContext.fillStyle = '#5337B8';
  artworkContext.fillRect(0, 0, 120, 120);
  artworkContext.fillStyle = '#F5C84C';
  artworkContext.fillRect(0, 60, 120, 60);
  const artwork = artworkCanvas.toBuffer('image/png');

  const sharedOptions = {
    albumArt: artwork,
    fallbackArt: artwork,
    trackName: 'A New Horizon',
    artistName: 'Example Artist',
    timeAdjust: { timeStart: '1:05', timeEnd: '3:45' },
    progressBar: 30,
  };

  for (const [name, render] of [
    ['Bloom', Bloom],
    ['Calm', Calm],
    ['Drift', Drift],
    ['Ease', Ease],
    ['Haze', Haze],
    ['Melt', Melt],
  ]) {
    const started = await render({ ...sharedOptions, type: 'start' });
    const added = await render({ ...sharedOptions, type: 'add', likes: 1200, views: 54000, position: 3 });

    assert.ok(Buffer.isBuffer(started), `${name} should return a start-card buffer`);
    assert.ok(Buffer.isBuffer(added), `${name} should return an add-card buffer`);
    assert.ok(started.length > 100, `${name} start card should not be empty`);
    assert.ok(added.length > 100, `${name} add card should not be empty`);
  }
});

test('start and add details render into a canvas without errors', () => {
  const canvas = createCanvas(800, 220);
  const context = canvas.getContext('2d');

  drawCardTypeDetails(context, 'start', { x: 40, y: 40, maxWidth: 700 }, {});
  drawCardTypeDetails(
    context,
    'add',
    { x: 40, y: 95, maxWidth: 700 },
    { likes: 1200, views: 54000, position: 3 },
  );
  drawCardTypeDetails(
    context,
    'add',
    { x: 40, y: 135, maxWidth: 700 },
    { likes: 2_000_000, views: 12, position: -4 },
  );
  drawCardTypeDetails(
    context,
    'add',
    { x: 40, y: 170, maxWidth: 1 },
    { likes: Number.NaN, views: Number.NaN, position: Number.NaN },
  );
  drawCardTypeDetails(context, 'nowPlaying', { x: 40, y: 40, maxWidth: 700 }, {});

  const png = canvas.toBuffer('image/png');
  assert.ok(Buffer.isBuffer(png));
  assert.ok(png.length > 100);
});
