import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin/admin.service';
import { IUsers } from '../shared/models/users';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: IUsers[];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  // tslint:disable-next-line: typedef
  loadUsers() {
    // tslint:disable-next-line: deprecation
    this.adminService.getUsers().subscribe((users: IUsers[]) => {
      this.users = users;
    }, error => {
      console.log(error);
    });
  }


}
