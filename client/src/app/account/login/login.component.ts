import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';
import { AuthService } from 'angularx-social-login';
import { SocialUser, GoogleLoginProvider} from 'angularx-social-login';
import { of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  user: SocialUser;
  registerForm: FormGroup;
  errors: string[];

  // tslint:disable-next-line: max-line-length
  constructor(private authService: AuthService, private accountService: AccountService, private router: Router, private activatedRoute: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/shop';
    this.createLoginForm();
    this.authService.authState.subscribe((user) => {
      this.user = user;

    });
    this.createRegisterForm_google();
  }
  signInWithGoogle(): any {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  signOut(): any{
    // tslint:disable-next-line: no-unused-expression
    this.authService.signOut();
  }
  // tslint:disable-next-line: typedef
  createRegisterForm_google() {
    this.registerForm = this.fb.group({
      displayName: [null, [Validators.required]],
      email: [null,
        [Validators.required, Validators
        .pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')],
        [this.validateEmailNotTaken_google()]
      ],
      password: [null, Validators.required]
    });
  }
  validateEmailNotTaken_google(): AsyncValidatorFn {
    return control => {
      return timer(500).pipe(
        switchMap(() => {
          if (control.value) {
            return of(null);
          }
          return this.accountService.checkEmailExists(control.value).pipe(
            map(res => {
               return res ? {emailExists: true} : null;
            })
          );
        })
      );
    };
  }
  // tslint:disable-next-line: typedef
  OnSubmit() {
    this.accountService.register_google(this.registerForm.value).subscribe(response => {
      this.router.navigateByUrl('/shop');
    }, error => {
      console.log(error);
      this.errors = error.errors;
    });
  }
  // tslint:disable-next-line: typedef
  createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators
        .pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      password: new FormControl('', Validators.required),
    });
  }

  // tslint:disable-next-line: typedef
  onSubmit() {
    this.accountService.login(this.loginForm.value).subscribe(() => {
      this.router.navigateByUrl(this.returnUrl);
    }, error => {
      console.log(error);
    });
  }

}
