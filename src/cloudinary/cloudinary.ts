import { v2 as cloudinary } from 'cloudinary';
import config from './config';
import rootConfig from '../configs/root';

cloudinary.config(config);

export async function upload(id: string, stage: number, namespase: string) {
  const src = `${rootConfig.tmp}/${namespase}/${id}.png`;
  const params = {
    public_id: `${stage}_${id}`, 
    crop: 'limit',
    width: 2000,
    height: 2000,
    eager: [
      {
        width: 200,
        height: 200,
        crop: 'thumb',
        gravity: 'face',
        radius: 20,
        effect: 'sepia'
      },
      {
        width: 100,
        height: 150,
        crop: 'fit',
        format: 'png'
      }
    ]
  };

  return '';

  const { url } = await cloudinary.uploader.upload(src, params);

  return url;
}
