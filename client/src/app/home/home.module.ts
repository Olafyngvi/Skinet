import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { SearchComponent } from './search/search.component';
import { IzdvojenoComponent } from './izdvojeno/izdvojeno.component';
import { CallactionComponent } from './callaction/callaction.component';
import { NovoComponent } from './novo/novo.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrendoviComponent } from './brendovi/brendovi.component';

@NgModule({
  declarations: [
    HomeComponent,
    SearchComponent,
    IzdvojenoComponent,
    CallactionComponent,
    NovoComponent,
    BrendoviComponent,
  ],
  imports: [CommonModule, SharedModule, BrowserModule, RouterModule],
  exports: [HomeComponent],
})
export class HomeModule {}
