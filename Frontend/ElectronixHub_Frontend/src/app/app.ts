// import { Component, OnInit } from '@angular/core';
// import { Router, RouterLink, RouterOutlet } from '@angular/router';

// import { CommonModule } from '@angular/common';
// import { Home } from './home/home';


// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet, RouterLink,CommonModule,],
//   templateUrl: './app.html',
//   styleUrls: ['./app.css']
// })
// export class App  {
  
//   protected title = 'ElectronixHub';
//   cartItemCount = 0;
//    constructor(private router: Router) {}
//   isLoggedIn(): boolean {
//     return localStorage.getItem('isLoggedIn') === 'true';
//   }

//   logout(): void {
//     localStorage.removeItem('isLoggedIn');
//     localStorage.removeItem('username');
//     this.router.navigate(['/login']);
//   }
//   isAdmin(): boolean {
//   return localStorage.getItem('role') === 'ADMIN';
// }

//    featuredProducts = [
//     {
//       name: 'Smartphone',
//       description: 'Latest model with high performance.',
//       image: 'smartphone1.jpg'
//     },
//     {
//       name: 'Laptop',
//       description: 'Powerful and portable for all your needs.',
//       image: 'laptop.jpg'
//     },
//     {
//       name: 'Smartwatch',
//       description: 'Stay connected on the go.',
//       image: 'smartwatch.webp'
//     }
//   ];

  
// }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dataservice } from './dataservice';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  protected title = 'ElectronixHub';
  cartItemCount = 0;
  isUserLoggedIn = false;
  isUserAdmin = false;
  
   
  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }
  isAdmin(): boolean {
  return localStorage.getItem('role') === 'ADMIN';
}
  constructor(private router: Router, private dataService: Dataservice) {}

  ngOnInit(): void {
    this.updateUserState();
  }

  updateUserState(): void {
    const username = localStorage.getItem('username');
    this.isUserLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this.isUserAdmin = localStorage.getItem('role') === 'ADMIN';

    if (this.isUserLoggedIn && username) {
      this.dataService.loadCartItemCount(username);
      this.dataService.getCartItemCount().subscribe(count => {
        this.cartItemCount = count;
      });
    } else {
      this.cartItemCount = 0;
    }
  }

  // logout(): void {
  //   localStorage.clear();
  //   this.isUserLoggedIn = false;
  //   this.isUserAdmin = false;
  //   this.cartItemCount = 0;
  //   this.router.navigate(['/login']);
  // }
  

  featuredProducts = [
    {
      name: 'Smartphone',
      description: 'Latest model with high performance.',
      image: 'smartphone1.jpg'
    },
    {
      name: 'Laptop',
      description: 'Powerful and portable for all your needs.',
      image: 'laptop.jpg'
    },
    {
      name: 'Smartwatch',
      description: 'Stay connected on the go.',
      image: 'smartwatch.webp'
    }
  ];
}
