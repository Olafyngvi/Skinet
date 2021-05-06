import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [HomeComponent, SearchComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
