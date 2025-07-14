
// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Route, Router, RouterLink, RouterOutlet, } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { Dataservice } from '../dataservice';

// @Component({
//   selector: 'app-register',
//   standalone: true,
//   imports: [CommonModule, RouterOutlet, RouterLink, FormsModule],
//   templateUrl: './register.html',
//   styleUrls: ['./register.css']
// })
// export class Register {
  
//   user = {
//     username: '',
//     password: '',
//     email: ''
//   };

//   successMessage = '';
//   errorMessage = '';

//   constructor(private dataService: Dataservice,
//     private router :Router
//   ) {}

//   register(): void {
//     // Validate form fields
//     if (!this.user.username || !this.user.password || !this.user.email) {
//       this.errorMessage = 'Please fill in all fields.';
//       this.successMessage = '';
//       return;
//     }

//     // Call API to register
//     this.dataService.register(this.user).subscribe({
//       next: (res) => {
//         console.log('User registered successfully:', res);
//         // Use the backend response message
//         this.successMessage = res.message || 'Registration successful!';
//         this.errorMessage = '';
//         alert('Registration successfully.');
//         this.router.navigate(['/login']);


//         // Clear the form fields
//         this.user = {
//           username: '',
//           password: '',
//           email: ''
//         };
//       },
//       error: (err) => {
//         console.error('Registration error:', err);
//         // Show the error message from the backend if available
//         if (err.error && err.error.message) {
//           this.errorMessage = err.error.message;
//         } else {
//           this.errorMessage = 'Error registering user. Please try again.';
//         }
//         this.successMessage = '';
//       }
//     });
//   }
// }

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Dataservice } from '../dataservice';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  user = {
    username: '',
    password: '',
    email: '',
    role: 'USER' // Default role
  };

  successMessage = '';
  errorMessage = '';

  constructor(
    private dataService: Dataservice,
    private router: Router
  ) {}

  register(): void {
    // Validate form fields
    if (
      !this.user.username ||
      !this.user.password ||
      !this.user.email ||
      !this.user.role
    ) {
      this.errorMessage = 'Please fill in all fields.';
      this.successMessage = '';
      return;
    }

    // Call API to register
    this.dataService.register(this.user).subscribe({
      next: (res) => {
        console.log('User registered successfully:', res);
        this.successMessage = res.message || 'Registration successful!';
        this.errorMessage = '';
        alert('Registration successful.');
        this.router.navigate(['/login']);

        // Clear the form fields
        this.user = {
          username: '',
          password: '',
          email: '',
          role: 'USER'
        };
      },
      error: (err) => {
        console.error('Registration error:', err);
        if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Error registering user. Please try again.';
        }
        this.successMessage = '';
      }
    });
  }
}
