import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { LoginService } from "../../login/login.service";
import { CommonModule } from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{
  profileForm = new FormGroup({
    name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  error: string | null = null; // Add error variable
  isLoggedIn: boolean = false;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(){
    // this.isLoggedIn = this.loginService.isLoggedIn();
  }

  send(): void {
    const loginData = {
      name: this.profileForm.value.name,
      password: this.profileForm.value.password
    };

    this.loginService.login(loginData).subscribe({
      next: (response: any) => {
        if (response.token) { // Adjust according to the actual response structure
          this.loginService.setToken(response.token);
          this.error = null; // Reset error on successful login
          console.log('Login successful!');
          this.isLoggedIn = this.loginService.isLoggedIn();
          setTimeout(() => {
            this.router.navigate(['/admin']).then();
          }, 5000);
        } else {
          this.error = 'Invalid login response';
          console.error('Invalid login response', response);
          this.isLoggedIn = false;
        }
      },
      error: (error) => {
        this.isLoggedIn = false;
        this.error = 'Proszę wprowadzić prawidłowe dane logowania'; // Set error message
        console.error('Login error', error);
      }
    });
  }
}
