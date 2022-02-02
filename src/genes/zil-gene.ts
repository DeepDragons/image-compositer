export class ZilGene {
  #chain: number[];

  public get chain() {
    return this.#chain;
  }

  public get aura() {
    return this.#chain[0];
  }

  public get colorAura() {
    return this.#chain[1];
  }

  public get horns() {
    return this.#chain[2];
  }

  public get colorHorns() {
    return this.#chain[3];
  }

  public get scales() {
    return this.#chain[4];
  }

  public get colorScales() {
    return this.#chain[5];
  }

  public get spots() {
    return this.#chain[6];
  }

  public get colorSpots() {
    return this.#chain[7];
  }

  public get tail() {
    return this.#chain[8];
  }

  public get colorTail() {
    return this.#chain[9];
  }

  public get wings() {
    return this.#chain[10];
  }

  public get colorWings() {
    return this.#chain[11];
  }

  public get spins() {
    return this.#chain[12];
  }

  public get colorSpins() {
    return this.#chain[13];
  }

  public get body() {
    return this.#chain[14];
  }

  public get colorBody() {
    return this.#chain[15];
  }

  public get eyes() {
    return this.#chain[16];
  }

  public get colorEyes() {
    return this.#chain[17];
  }

  public get head() {
    return this.#chain[18];
  }

  public get colorClaws() {
    return this.#chain[19];
  }

  public get colorScheme() {
    return this.#chain[20];
  }

  public get mutagenImutable() {
    return this.#chain[21];
  }

  constructor(genes: string) {
    this.#chain = genes
      .substring(3, 23) // remove 777 and colors schema
      .split('')
      .map(Number);
    this.#chain = [
      ...this.#chain,
      Number(genes.substring(23, 26)), // Colors schema
      Number(genes.substring(26)) // mutagenImutable
    ];
  }
}
