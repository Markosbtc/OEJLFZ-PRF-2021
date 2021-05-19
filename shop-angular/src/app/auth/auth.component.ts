import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  registrationForm: FormGroup;

  isLoginActive = true;
  userSubs: Subscription;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.resetLoginForm();
  }

  ngOnDestroy(): void {
    if (this.userSubs) {
      this.userSubs.unsubscribe();
    }
  }

  resetLoginForm(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
    });
  }

  resetRegistrationForm(): void {
    this.registrationForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      passwordAgain: new FormControl(''),
    });
  }

  setIsLoginActive(): void {
    if (this.isLoginActive) {
      this.resetRegistrationForm();
    } else {
      this.resetLoginForm();
    }
    this.isLoginActive = !this.isLoginActive;
  }

  submit(): void {
    if (this.isLoginActive) {
      this.login();
    } else {
      if (
        this.registrationForm.value.password ===
        this.registrationForm.value.passwordAgain
      ) {
        this.createUser({
          email: this.registrationForm.value.email,
          name: this.registrationForm.value.name,
          password: this.registrationForm.value.password,
        });
      } else {
        this.registrationForm.controls.passwordAgain.setErrors({
          incorrect: true,
        });
      }
    }
  }

  createUser(user): void {
    this.userSubs = this.authService.register(user.name, user.email, user.password).subscribe(
      (res: any) => {
        console.log(res);
        this.snackBar.open('Successful registration!', null, {
          duration: 2000,
        });
        setTimeout(() => {
          this.setIsLoginActive();
        }, 1500);
      },
      (error) => {
        this.snackBar.open(error.message, null, { duration: 2000 });
      }
    );
  }

  login(): void {
    this.userSubs = this.authService
      .login(
        this.loginForm.value.username,
        this.loginForm.value.password,
      )
      .subscribe(
        (res: any) => {
          //console.log(res);
          this.authService.getPassport().subscribe(
            (res: any) => {
              //console.log(res);
              localStorage.setItem('user', res.user._id);
              this.router.navigate(['/home']);
            }, error => {
              console.error(error);
            }
          )
        },
        (error) => {
          console.error(error);
          this.snackBar.open(error.message, null, { duration: 2000 });
        }
      );
  }

  authenticate() {
    this.userSubs = this.authService.getPassport().subscribe(
      (res: any) => {
        console.log(res);
        localStorage.setItem('user', res.user._id);
      }, error => {
        console.error(error);
      }
    )
  }

}
