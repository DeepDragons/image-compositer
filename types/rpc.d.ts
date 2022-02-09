export interface RPCBody {
  id: number;
  jsonrpc: string;
  method: string;
  params: Params;
};
export type Params = TxParams[] | string[] | number[] | (string | string[] | number[])[];
