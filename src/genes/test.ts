import { ZilGene } from './zil-gene';
import genesIds from './test.json';
import assert from 'assert';

function parseGens(gensStr: string) {
  const gensObj = {
    "aura": 0,
    "colorAura": 0,
    "horns": 0,
    "colorHorns": 0,
    "scales": 0,
    "colorScales": 0,
    "spots": 0,
    "colorSpots": 0,
    "tail": 0,
    "colorTail": 0,
    "wings": 0,
    "colorWings": 0,
    "spins": 0,
    "colorSpins": 0,
    "body": 0,
    "colorBody": 0,
    "eyes": 0,
    "colorEyes": 0,
    "head": 0,
    "colorClaws": 0,
    "colorScheme": 0,
    "mutagenImutable": 0
  };

  let gen = 0;

  gen = parseInt(gensStr.substr(3, 1));
  gensObj.aura = gen;
  gen = parseInt(gensStr.substr(4, 1));
  gensObj.colorAura = gen;
  gen = parseInt(gensStr.substr(5, 1));
  gensObj.horns = gen;
  gen = parseInt(gensStr.substr(6, 1));
  gensObj.colorHorns = gen;
  gen = parseInt(gensStr.substr(7, 1));
  gensObj.scales = gen;
  gen = parseInt(gensStr.substr(8, 1));
  gensObj.colorScales = gen;
  gen = parseInt(gensStr.substr(9, 1));
  gensObj.spots = gen;
  gen = parseInt(gensStr.substr(10, 1));
  gensObj.colorSpots = gen;
  gen = parseInt(gensStr.substr(11, 1));
  gensObj.tail = gen;
  gen = parseInt(gensStr.substr(12, 1));
  gensObj.colorTail = gen;
  gen = parseInt(gensStr.substr(13, 1));
  gensObj.wings = gen;
  gen = parseInt(gensStr.substr(14, 1));
  gensObj.colorWings = gen;
  gen = parseInt(gensStr.substr(15, 1));
  gensObj.spins = gen;
  gen = parseInt(gensStr.substr(16, 1));
  gensObj.colorSpins = gen;
  gen = parseInt(gensStr.substr(17, 1));
  gensObj.body = gen;
  gen = parseInt(gensStr.substr(18, 1));
  gensObj.colorBody = gen;
  gen = parseInt(gensStr.substr(19, 1));
  gensObj.eyes = gen;
  gen = parseInt(gensStr.substr(20, 1));
  gensObj.colorEyes = gen;
  gen = parseInt(gensStr.substr(21, 1));
  gensObj.head = gen;
  gen = parseInt(gensStr.substr(22, 1));
  gensObj.colorClaws = gen;
  gen = parseInt(gensStr.substr(23, 3));
  gensObj.colorScheme = gen;
  gen = parseInt(gensStr.substr(26, 3));
  gensObj.mutagenImutable = gen;

  return gensObj;
}


const genes = Object.values(genesIds);

genes.forEach((gene) => {
  try {
    const t0 = new ZilGene(gene);

    // assert.equal(t0.aura, t1.aura);
    // assert.equal(t0.colorAura, t1.colorAura);
    // assert.equal(t0.body, t1.body);
    // assert.equal(t0.colorBody, t1.colorBody);
    // assert.equal(t0.colorClaws, t1.colorClaws);
    // assert.equal(t0.colorEyes, t1.colorEyes);
    // assert.equal(t0.colorHorns, t1.colorHorns);
    // assert.equal(t0.colorScales, t1.colorScales);
    // assert.equal(t0.colorScheme, t1.colorScheme);
    // assert.equal(t0.colorSpins, t1.colorSpins);
    // assert.equal(t0.colorSpots, t1.colorSpots);
    // assert.equal(t0.colorTail, t1.colorTail);
    // assert.equal(t0.colorWings, t1.colorWings);
    // assert.equal(t0.eyes, t1.eyes);
    // assert.equal(t0.head, t1.head);
    // assert.equal(t0.horns, t1.horns);
    // assert.equal(t0.mutagenImutable, t1.mutagenImutable);
    // assert.equal(t0.scales, t1.scales);
    // assert.equal(t0.spins, t1.spins);
    // assert.equal(t0.spots, t1.spots);
    // assert.equal(t0.tail, t1.tail);
    // assert.equal(t0.wings, t1.wings);

    console.log(t0.colorBody);
    console.log(t0.colorClaws);
    console.log(t0.colorEyes);
    console.log(t0.colorHorns);
    console.log(t0.colorScales);
    console.log(t0.colorSpins);
    console.log(t0.colorSpots);
    console.log(t0.colorTail);
    console.log(t0.colorWings);
  } catch (err) {
    console.error(err);
  }
});
