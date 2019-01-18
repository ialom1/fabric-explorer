import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Headline } from './headline.model';


@Injectable({providedIn: 'root'})
export class HeadlineService {
  private headline: Headline[] = [];
  private headlineUpdated = new Subject<Headline[]>();

  constructor(private http: HttpClient) {}

  getHeadline() {
    this.http.get<{message: string, headline: Headline[]}>('http://localhost:3000/api/headline')
      .subscribe((headlineData) => {
        this.headline = headlineData.headline;
        this.headlineUpdated.next([...this.headline]);
      });
  }

  getBlocksUpdateListener() {
    return this.headlineUpdated.asObservable();
  }

}
