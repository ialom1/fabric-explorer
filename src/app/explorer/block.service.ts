import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Block } from './block.model';


@Injectable({providedIn: 'root'})
export class BlockService {
  private blocks: Block[] = [];
  private blocksUpdated = new Subject<Block[]>();

  constructor(private http: HttpClient) {}

  getBlocks() {
    this.http.get<{message: string, blocks: Block[]}>('http://localhost:3000/api/blocks')
      .subscribe((blocksData) => {
        this.blocks = blocksData.blocks;
        this.blocksUpdated.next([...this.blocks]);
      });
  }

  getBlocksUpdateListener() {
    return this.blocksUpdated.asObservable();
  }

}
