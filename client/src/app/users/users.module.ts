import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { SharedModule } from '../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { OrdersByUserComponent } from './orders-by-user/orders-by-user.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';



@NgModule({
  declarations: [UsersComponent, OrdersByUserComponent],
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule,
    AccordionModule
  ]
})
export class UsersModule { }
