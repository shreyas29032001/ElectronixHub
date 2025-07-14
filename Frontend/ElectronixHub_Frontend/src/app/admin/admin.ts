import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [RouterLink,RouterOutlet],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin implements OnInit {
  constructor(private router: Router) {}

  // ngOnInit(): void {
  //   if (localStorage.getItem('role') !== 'ADMIN') {
  //     // Not an admin? Redirect away
  //     this.router.navigate(['/home']);
  //   }
  // }
  
  ngOnInit(): void {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const role = localStorage.getItem('role');

    if (isLoggedIn !== 'true' || role !== 'ADMIN') {
      alert('Access denied. Admins only.');
      this.router.navigate(['/login']);
    }
  }
}