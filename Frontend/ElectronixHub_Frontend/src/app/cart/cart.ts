

// import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
// import { Dataservice } from '../dataservice';
// import { RouterLink } from '@angular/router';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-cart',
//   standalone: true,
//   imports: [CommonModule, RouterLink],
//   templateUrl: './cart.html',
//   styleUrls: ['./cart.css']
// })
// export class Cart implements OnInit {
//   cartItems: any[] = [];
//   username: string = '';
//   total: number = 0;
//   message: string = '';

//   constructor(
//     private dataService: Dataservice,
//     private cdRef: ChangeDetectorRef  // <-- Inject here
//   ) {}

//   ngOnInit(): void {
//     const storedUsername = localStorage.getItem('username');
//     console.log('Stored username:', storedUsername);
//     if (storedUsername) {
//       this.username = storedUsername;
//       this.loadCart();
//     } else {
//       this.message = 'Please log in to view your cart.';
//     }
//   }

//   loadCart(): void {
//     console.log('Loading cart for', this.username);
//     this.dataService.getCartItems(this.username).subscribe({
//       next: (items) => {
//         console.log('Items returned by API:', items);
//         this.cartItems = items;
//         this.calculateTotal();
//         this.cdRef.detectChanges();  // <-- Force change detection
//       },
//       error: (err) => {
//         console.error('Error loading cart:', err);
//         this.message = 'Failed to load cart.';
//         this.cdRef.detectChanges();
//       }
//     });
//   }

//   calculateTotal(): void {
//     this.total = this.cartItems.reduce(
//       (sum, item) => sum + item.price * item.quantity,
//       0
//     );
//   }

//   removeItem(productId: number): void {
//     this.dataService.removeCartItem(this.username, productId).subscribe(() => {
//       this.loadCart();  // Reload and detect changes
//     });
//   }

//   clearCart(): void {
//     this.dataService.clearCart(this.username).subscribe(() => {
//       this.loadCart();  // Reload and detect changes
//     });
//   }
// }

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Dataservice } from '../dataservice';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class Cart implements OnInit {
  cartItems: any[] = [];
  username: string = '';
  total: number = 0;
  message: string = '';
  totalAmount: number = 0;


  constructor(
    private dataService: Dataservice,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const storedUsername = localStorage.getItem('username');
    console.log('Stored username:', storedUsername);

    if (storedUsername) {
      this.username = storedUsername;
      this.loadCart();
    } else {
      this.message = 'Please log in to view your cart.';
    }
  }

  loadCart(): void {
    console.log('Loading cart for:', this.username);
    this.dataService.getCartItems(this.username).subscribe({
      next: (items) => {
        console.log('Cart items loaded:', items);
        this.cartItems = items || [];
        this.calculateTotal();
        this.cdRef.detectChanges();
      },
      error: (err) => {
        console.error('Error loading cart:', err);
        this.message = 'Failed to load cart.';
      }
    });
  }

  calculateTotal(): void {
    this.total = this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    console.log('Total recalculated:', this.total);
  }

  removeItem(productId: number): void {
  this.dataService.removeCartItem(this.username, productId).subscribe({
    next: () => this.loadCart(),
    error: (err) => console.error('Error removing item:', err)
  });
}


placeOrder() {
  const order = {
    totalAmount: this.totalAmount,
    status: 'Pending'
  };

  this.dataService.placeOrder(this.username, order).subscribe({
    next: (data) => {
      alert("Order placed successfully!");
      this.dataService.clearCart(this.username).subscribe(); // optional
    },
    error: () => {
      alert("Failed to place order.");
    }
  });
}


}
