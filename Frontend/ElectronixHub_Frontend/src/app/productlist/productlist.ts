import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Dataservice } from '../dataservice';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './productlist.html',
  styleUrls: ['./productlist.css']
})
export class ProductList implements OnInit {
  products: any[] = [];

  constructor(
    private dataService: Dataservice,
    private router: Router,
    private cdr: ChangeDetectorRef // ✅ Important
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.dataService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res;
        this.cdr.detectChanges(); // ✅ Must trigger manually
      },
      error: (err) => {
        console.error('Error loading products:', err);
      }
    });
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.dataService.deleteProduct(id).subscribe({
        next: () => {
          this.products = this.products.filter(p => p.id !== id);
          this.cdr.detectChanges(); // ✅ Must trigger manually
        },
        error: (err) => {
          console.error('Error deleting product:', err);
        }
      });
    }
  }

  editProduct(id: number): void {
    this.router.navigate(['/updateproduct', id]);
  }
}
