
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Dataservice } from '../dataservice';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  user = {
    username: '',
    password: ''
  };

  successMessage = '';
  errorMessage = '';

  constructor(
    private dataService: Dataservice,
    private router: Router
  ) {}

  login(): void {
    if (!this.user.username || !this.user.password) {
      this.errorMessage = 'Please fill in all fields.';
      this.successMessage = '';
      return;
    }

    this.dataService.login(this.user).subscribe({
      next: (res) => {
        console.log(res);
        this.successMessage = res.message || 'Login successful!';
        this.errorMessage = '';

        // Store login state
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', res.username || this.user.username);
        localStorage.setItem('role', res.role || 'USER');

        alert('Login successful');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Invalid credentials.';
        this.successMessage = '';
      }
    });
  }
}

