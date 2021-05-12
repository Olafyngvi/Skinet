import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { SearchComponent } from './search/search.component';
import { IzdvojenoComponent } from './izdvojeno/izdvojeno.component';
import { CallactionComponent } from './callaction/callaction.component';
<<<<<<< HEAD
import { NovoComponent } from './novo/novo.component';
=======
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

>>>>>>> 55112e1e256c8da78df613986edfd30a0cd567b0

@NgModule({
  declarations: [HomeComponent, SearchComponent, IzdvojenoComponent, CallactionComponent, NovoComponent],
  imports: [
    CommonModule,
    SharedModule,
    BrowserModule,
    RouterModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
