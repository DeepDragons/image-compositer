import { Raw } from 'sharp';

const width = 2000;
const height = 2000;
const channels = 4;
const rgbaPixel = 0x00000000;

const canvas = Buffer.alloc(width * height * channels, rgbaPixel);

export default {
  canvas,
  raw: {
    width,
    height,
    channels
  } as Raw
};
