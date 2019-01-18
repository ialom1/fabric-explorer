import { Component, OnInit, OnDestroy } from '@angular/core';
import { Trnxn } from '../trnxn.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Block } from '../block.model';
import { TrnxnService } from '../trnxn.service';

@Component({
  selector: 'app-trnxn',
  templateUrl: './trnxn.component.html',
  styleUrls: ['./trnxn.component.css']
})
export class TrnxnComponent implements OnInit, OnDestroy {
  blockSubscription: Subscription;
  block: Block;

  constructor(public trnxnService: TrnxnService) {}

  onAddPost(form: NgForm) {
    // if (form.invalid) {
    //   return;
    // }
    const trnxnid = form.value.trnxnid;
    this.trnxnService.getBlock(trnxnid);
    this.blockSubscription = this.trnxnService.getTrnxnsUpdateListener()
    .subscribe((block: Block) => {
        this.block = block;
      });
    form.resetForm();
  }

  ngOnInit() {
    // this.trnxnService.getBlock();
    // this.blockSubscription = this.trnxnService.getTrnxnsUpdateListener()
    // .subscribe((block: Block) => {
    //     this.block = block;
    //   });

  }
  ngOnDestroy() {
    this.blockSubscription.unsubscribe();
  }
}
