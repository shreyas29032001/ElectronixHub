import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dataservice } from '../dataservice';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './updateproduct.html',
  styleUrls: ['./updateproduct.css']
})
export class UpdateProduct implements OnInit {
  product: any = {
    id: null,
    name: '',
    description: '',
    price: 0,
    image: '',
    category: { id: null }
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: Dataservice
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProduct(id);
  }

  loadProduct(id: number): void {
    this.dataService.getProductById(id).subscribe({
      next: (res) => {
        this.product = res;
      },
      error: (err) => {
        console.error('Error loading product:', err);
        alert('Could not load product.');
      }
    });
  }

  updateProduct(): void {
    if (!this.product.id) {
      alert('Invalid product ID.');
      return;
    }

    this.dataService.updateProduct(this.product.id, this.product).subscribe({
      next: () => {
        alert('Product updated successfully.');
        this.router.navigate(['/productlist']);
      },
      error: (err) => {
        console.error('Error updating product:', err);
        alert('Error updating product.');
      }
    });
  }
}
