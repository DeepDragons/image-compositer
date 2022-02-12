// import * as dotenv from 'dotenv';

// dotenv.config();
// import rootConfig from './src/configs/root';
// import { upload } from './src/cloudinary/cloudinary';
// import bunyan from 'bunyan';

// // import bunyan from 'bunyan';

// // import { generateAnEgg } from './src/eggs/egg';
// // import { dragon } from './src/dragons/dragon';

// // import { Token } from './src/token';

// // import genes from './src/genes/test.json';

// const log = bunyan.createLogger({
//   name: "Main"
// });

// upload('3443', 0, rootConfig.namespase.eggs)
//   .then((...args) => log.info(args))
//   .catch((...errs) => log.error(errs));

// // (async function(){
// //   const list = Object.values(genes);

// //   // const t = new Token('77710302201321213223210245050', String(4533));
// //   // await generateAnEgg(t);
// //   // await dragon(t);

// //   for (let index = 654; index < list.length; index++) {
// //     log.info(`INIT generator id: ${index}`);
// //     const gene = list[index];
// //     const t = new Token(gene, String(index));
// //     log.info(`sart egg generate: ${index}`);
// //     await generateAnEgg(t);
// //     log.info(`sart dragon generate: ${index}`);
// //     await dragon(t);
// //     log.info(`end generate: ${index}`);

// //     // break;
// //   }
// // }());
