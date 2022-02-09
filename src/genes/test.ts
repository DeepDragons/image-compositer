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

function gensToString(gensObj: any) {
  return `0-${gensObj.colorScheme}-\
${gensObj.aura}-\
${gensObj.colorAura}-\
${gensObj.wings}-\
0-\
${gensObj.colorWings}-\
${gensObj.tail}-\
0-\
${gensObj.colorTail}-\
${gensObj.body}-\
${gensObj.colorBody}-\
${gensObj.spots}-\
${gensObj.colorSpots}-\
${gensObj.scales}-\
${gensObj.colorScales}-\
${gensObj.horns}-\
${gensObj.colorHorns}-\
${gensObj.head}-\
0-\
${gensObj.mutagenImutable}-\
0-\
0-\
${gensObj.colorClaws}-\
${gensObj.eyes}-\
${gensObj.colorEyes}-\
${gensObj.spins}-\
${gensObj.colorSpins}-\
0-0-0-0`;
}

const genes = '77710302201321213223210245050';
const t0 = new ZilGene(genes);

// console.log(parseGens(genes));
// console.log(t0.colorAura, t0.chain[1]);
console.log(gensToString(parseGens(genes)));
