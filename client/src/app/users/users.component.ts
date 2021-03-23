import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../admin/admin.service';
import { IUsers } from '../shared/models/users';
import { UsersParams } from '../shared/models/usersParams';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  @ViewChild('search', { static: false }) searchTerm: ElementRef;
  users: IUsers[];
  usersParams: UsersParams;
  totalCount: number;
  sortOptions = [
    { name: 'Alphabetical Ascending', value: 'nameAsc' },
    { name: 'Alphabetical Descending', value: 'nameDesc' },
  ];

  constructor(private adminService: AdminService) {
    this.usersParams = this.adminService.getUsersParams();
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  // tslint:disable-next-line: typedef
  loadUsers() {
    // tslint:disable-next-line: deprecation
    this.adminService.getUsers().subscribe(
      (response) => {
        this.users = response.data;
        this.totalCount = response.count;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // tslint:disable-next-line: typedef
  onSortSelected(sort: string) {
    const params = this.adminService.getUsersParams();
    params.sort = sort;
    this.adminService.setUsersParams(params);
    this.loadUsers();
  }

  // tslint:disable-next-line: typedef
  onPageChanged(event: any) {
    const params = this.adminService.getUsersParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.adminService.setUsersParams(params);
      this.loadUsers();
    }
  }

  // tslint:disable-next-line: typedef
  onSearch() {
    const params = this.adminService.getUsersParams();
    params.search = this.searchTerm.nativeElement.value;
    params.pageNumber = 1;
    this.adminService.setUsersParams(params);
    this.loadUsers();
  }

  // tslint:disable-next-line: typedef
  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.usersParams = new UsersParams();
    this.adminService.setUsersParams(this.usersParams);
    this.loadUsers();
  }
}
