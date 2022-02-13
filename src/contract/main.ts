import type { KeyValue, RPCResponse } from 'types/rpc';

import fetch from 'cross-fetch';
import { RPCMethod } from '../configs/methods';
import { HttpProvider } from '../lib/http-provider';

export class MainContract {
  public static fields = {
    totalSupply: 'total_supply',
    tokenGenImage: 'token_gen_image',
    tokenCount: 'token_id_count',
    tokenUris: 'token_uris'
  };

  #address = process.env.CONTRACT;
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

  public async getUris(): Promise<KeyValue> {
    const req = this.#provider.buildBody(RPCMethod.GetSmartContractSubState, [
      this.#address,
      MainContract.fields.tokenUris,
      []
    ]);
    const [res] = await this.#send([req]);
    return res.result[MainContract.fields.tokenUris];
  }

  public async totalSupply(): Promise<bigint> {
    const req = this.#provider.buildBody(RPCMethod.GetSmartContractSubState, [
      this.#address,
      MainContract.fields.totalSupply,
      []
    ]);
    const [res] = await this.#send([req]);
    return BigInt(res.result[MainContract.fields.totalSupply]);
  }

  public async getDragons(ids: bigint[]) {
    const reqs = ids.map((id) => this.#provider.buildBody(RPCMethod.GetSmartContractSubState, [
      this.#address,
      MainContract.fields.tokenGenImage,
      [String(id)]
    ]));
    const resList = await this.#send(reqs);
    console.log(resList, this.#address, reqs, ids);
    return resList.map((res, index) => {
      const id = String(ids[index]);
      const obj = res.result[MainContract.fields.tokenGenImage];
      return {
        id,
        chain: obj[id]
      };
    });
  }

  public async tokenCount(): Promise<bigint> {
    const req = this.#provider.buildBody(RPCMethod.GetSmartContractSubState, [
      this.#address,
      MainContract.fields.tokenCount,
      []
    ]);
    const [res] = await this.#send([req]);
    return BigInt(res.result[MainContract.fields.tokenCount]);
  }

  async #send(batch: object[]): Promise<RPCResponse[]> {
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
