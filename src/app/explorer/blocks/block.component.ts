import { Component, OnInit, OnDestroy } from '@angular/core';
import { Block } from '../block.model';
import { Subscription } from 'rxjs';
import { BlockService } from '../block.service';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements OnInit, OnDestroy {
  blockSubscription: Subscription;
  blocks: Block[] = [];
  trnxns = [];

  constructor(public blocksService: BlockService) {}

  ngOnInit() {
    this.blocksService.getBlocks();
    this.blockSubscription = this.blocksService.getBlocksUpdateListener()
    .subscribe((blocks: Block[]) => {
        this.blocks = blocks;
      });

  }
  ngOnDestroy() {
    this.blockSubscription.unsubscribe();
  }
}
