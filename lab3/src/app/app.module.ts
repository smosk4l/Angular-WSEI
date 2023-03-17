import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { BeerDetailsComponent } from './beer-details/beer-details.component';
import { BeerListComponent } from './beer-list/beer-list.component';

@NgModule({
  declarations: [AppComponent, BeerDetailsComponent, BeerListComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
