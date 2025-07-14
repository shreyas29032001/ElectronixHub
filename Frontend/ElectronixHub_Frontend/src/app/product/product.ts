
import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink, RouterOutlet, NavigationEnd } from '@angular/router';
import { Dataservice } from '../dataservice';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './product.html',
  styleUrls: ['./product.css'] 
})
export class Product implements OnInit, OnDestroy {
  products: any[] = [];
  routerSubscription: Subscription | null = null; // ✅ fixed

  constructor(
    private dataService: Dataservice,
    private router: Router,
    private cdr: ChangeDetectorRef

  ) { }


  ngOnInit(): void {
    console.log('Product component ngOnInit() running...');
    this.loadProducts();

    this.routerSubscription = this.router.events.subscribe(event => {
      console.log('Router event:', event);
      if (event instanceof NavigationEnd) {
        console.log('NavigationEnd detected, loading products...');
        this.loadProducts();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }




  loadProducts(): void {
    this.dataService.getProducts().subscribe({
      next: (res) => {
        console.log('Products from backend:', res);
        this.products = res;
        this.cdr.detectChanges(); // Force view update
      },
      error: (err) => {
        console.error('Error loading products:', err);
      }
    });
  }

  handleAddToCart(product: any): void {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const username = localStorage.getItem('username'); // You MUST save username at login

    if (isLoggedIn === 'true' && username) {
      console.log('Adding to cart:', product);

      const cartItem = {
        product: { id: product.id },
        quantity: 1
      };

      this.dataService.addCartItem(username, cartItem).subscribe({
        next: (res) => {
          console.log('Item added to cart:', res);
          alert('Item added to cart!');
          // this.router.navigate(['/cart']);
        },
        error: (err) => {
          console.error('Error adding to cart:', err);
          alert('Failed to add item to cart.');
        }
      });
    } else {
      // Not logged in, redirect to login
      alert("Please Login first")
      this.router.navigate(['/login']);
    }
  }

}
