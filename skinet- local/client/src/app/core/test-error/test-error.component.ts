import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.css']
})
export class TestErrorComponent implements OnInit {
  baseUrl = environment.apiUrl;
  validationErrors: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  get404error() {
    this.http.get(this.baseUrl + 'Produkti/42').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  // tslint:disable-next-line: typedef
  get500error() {
    this.http.get(this.baseUrl + 'Buggy/servererror').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  // tslint:disable-next-line: typedef
  get400error() {
    this.http.get(this.baseUrl + 'Buggy/badrequest').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  // tslint:disable-next-line: typedef
  get400Validationerror() {
    this.http.get(this.baseUrl + 'Produkti/fortytwo').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
      this.validationErrors = error.errors;
    });
  }
}
