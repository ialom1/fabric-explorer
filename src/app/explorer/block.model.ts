export interface Block {
  blockNumber: number;
  blockHash: string;
  previousHash: string;
  dataHash: string;
  trnxnCount: number;
  trnxns: [];
}
