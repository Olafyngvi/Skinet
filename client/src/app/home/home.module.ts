import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { SearchComponent } from './search/search.component';
import { IzdvojenoComponent } from './izdvojeno/izdvojeno.component';

@NgModule({
  declarations: [HomeComponent, SearchComponent, IzdvojenoComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
