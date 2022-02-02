import assert from 'assert';
import colorScheme from './colors.json';

const MAX_NUM_SCHEMA = 4;

export function getColor(commonColorScheme: number, numOfColorSchema: number) {
  assert(commonColorScheme <= 336, `Maximum length of color palette is ${colorScheme.length}`);

  const num = numOfColorSchema > MAX_NUM_SCHEMA ? MAX_NUM_SCHEMA : numOfColorSchema;

  const colors = colorScheme[commonColorScheme];

  let r = colors[num][0];
  let g = colors[num][1];
  let b = colors[num][2];

  r = Math.floor((1 - (r / 255)) * 100);
  g = Math.floor((1 - (g / 255)) * 100);
  b = Math.floor((1 - (b / 255)) * 100);

  return {
    r,
    g,
    b
  };
}
