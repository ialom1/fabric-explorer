import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Trnxn } from './trnxn.model';
import { Block } from './block.model';


@Injectable({providedIn: 'root'})
export class TrnxnService {
  private block: Block;
  private trnxnsUpdated = new Subject<Block>();

  constructor(private http: HttpClient) {}

  getBlock(trnxnid) {
    this.http.get<{message: string, block: Block}>('http://localhost:3000/api/trnxn/' + trnxnid)
      .subscribe((blockData) => {
        this.block = blockData.block;
        this.trnxnsUpdated.next(this.block);
      });
  }

  getTrnxnsUpdateListener() {
    return this.trnxnsUpdated.asObservable();
  }

}
