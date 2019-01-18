import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Headline } from '../headline.model';
import { HeadlineService } from '../headline.service';

@Component({
  selector: 'app-headline',
  templateUrl: './headline.component.html',
  styleUrls: ['./headline.component.css']
})
export class HeadlineComponent implements OnInit, OnDestroy {
  headlineSubscription: Subscription;
  headline: Headline[] = [];

  constructor(public headlineService: HeadlineService) {}

  ngOnInit() {
    this.headlineService.getHeadline();
    this.headlineSubscription = this.headlineService.getBlocksUpdateListener()
    .subscribe((headline: Headline[]) => {
        this.headline = headline;
      });
  }
  ngOnDestroy() {
    this.headlineSubscription.unsubscribe();
  }
}
