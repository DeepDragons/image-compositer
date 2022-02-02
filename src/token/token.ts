import { ZilGene } from '../genes/zil-gene';

export class Token {
  public id: string;
  public genes: ZilGene;

  constructor(genes: string, id: string) {
    this.genes = new ZilGene(genes);
    this.id = id;
  }
}
