export interface RPCBody {
  id: number;
  jsonrpc: string;
  method: string;
  params: Params;
};
export type Params = TxParams[] | string[] | number[] | (string | string[] | number[])[];

export interface KeyValue {
  [key: string]: string;
}

export interface RPCResponse {
  id: number;
  jsonrpc: string;
  result?: any;
  error?: {
    code: number;
    data: unknown;
    message: string;
  };
};
