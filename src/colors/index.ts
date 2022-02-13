import assert from 'assert';
import Color from 'color';
import colorScheme from './colors.json';

const MAX_NUM_SCHEMA = 5;

export function getColor(commonColorScheme: number, numOfColorSchema: number) {
  assert(commonColorScheme <= 336, `Maximum length of color palette is ${colorScheme.length}`);

  const num = numOfColorSchema > MAX_NUM_SCHEMA ? MAX_NUM_SCHEMA : numOfColorSchema;

  const colors = colorScheme[commonColorScheme];
  let color = Color.rgb(colors[num]);

  color = color.lightness(30);
  return color.object();
}
