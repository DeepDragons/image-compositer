import type { KeyValue } from 'types/rpc';

import fetch from 'cross-fetch';
import { RPCMethod } from '../configs/methods';
import { HttpProvider } from '../lib/http-provider';

export class MainContract {
  public static fields = {
    totalSupply: 'total_supply',
    tokenGenImage: 'token_gen_image',
    tokenCount: 'token_id_count'
  };

  #address = 'b4d83becb950c096b001a3d1c7abb10f571ae75f';
  #http = 'https://api.zilliqa.com';
  #provider = new HttpProvider();

  public async getAllFaces(): Promise<KeyValue> {
    const req = this.#provider.buildBody(RPCMethod.GetSmartContractSubState, [
      this.#address,
      MainContract.fields.tokenGenImage,
      []
    ]);
    const [res] = await this.#send([req]);
    return res.result[MainContract.fields.tokenGenImage];
  }

  public async totalSupply(): Promise<string> {
    const req = this.#provider.buildBody(RPCMethod.GetSmartContractSubState, [
      this.#address,
      MainContract.fields.totalSupply,
      []
    ]);
    const [res] = await this.#send([req]);
    return res.result[MainContract.fields.totalSupply];
  }

  public async tokenCount(): Promise<string> {
    const req = this.#provider.buildBody(RPCMethod.GetSmartContractSubState, [
      this.#address,
      MainContract.fields.tokenCount,
      []
    ]);
    const [res] = await this.#send([req]);
    return res.result[MainContract.fields.tokenCount];
  }

  async #send(batch: object[]) {
    const res = await fetch(this.#http, {
      method: `POST`,
      headers: {
        "Content-Type": `application/json`,
      },
      body: JSON.stringify(batch),
    });
    return res.json();
  }
}
