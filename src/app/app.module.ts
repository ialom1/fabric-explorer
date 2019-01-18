import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatGridListModule,
  MatDividerModule,
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './explorer/header/header.component';
import { BlockComponent } from './explorer/blocks/block.component';
import { TrnxnComponent } from './explorer/trnxns/trnxn.component';
import { ChannelComponent } from './explorer/channels/channel.component';
import { HeadlineComponent } from './explorer/headline/headline.component';
import { BlockService } from './explorer/block.service';
import { TrnxnService } from './explorer/trnxn.service';
import { HeadlineService } from './explorer/headline.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BlockComponent,
    TrnxnComponent,
    ChannelComponent,
    HeadlineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatGridListModule,
    HttpClientModule,
    MatDividerModule
  ],
  providers: [ BlockService, TrnxnService, HeadlineService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
