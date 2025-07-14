// // import { Component } from '@angular/core';
// // import { Router, RouterLink } from '@angular/router';
// // import { Dataservice } from '../dataservice';
// // import { CommonModule } from '@angular/common';
// // import { FormsModule } from '@angular/forms';

// // @Component({
// //   selector: 'app-add-product',
// //   imports: [CommonModule, FormsModule, RouterLink],
// //   templateUrl: './addproduct.html',
// //   styleUrls: ['./addproduct.css']
// // })
// // export class AddProduct {
// //   product = {
// //     name: '',
// //     description: '',
// //     price: 0,
// //     image: '',
// //     category: null
// //   };

// //   successMessage = '';
// //   errorMessage = '';

// //   constructor(private dataService: Dataservice, private router: Router) {}

// //   saveProduct() {
// //     this.dataService.createProduct(this.product).subscribe({
// //       next: () => {
// //         this.successMessage = 'Product added successfully!';
// //         this.errorMessage = '';
// //         // Clear form
// //         this.product = {
// //           name: '',
// //           description: '',
// //           price: 0,
// //           image: '',
// //           category: null
// //         };
// //         // Optionally navigate to products
// //         // this.router.navigate(['/products']);
// //       },
// //       error: (err) => {
// //         this.errorMessage = 'Error adding product.';
// //         this.successMessage = '';
// //         console.error(err);
// //       }
// //     });
// //   }
// // }
// import { Component } from '@angular/core';
// import { Router, RouterLink } from '@angular/router';
// import { Dataservice } from '../dataservice';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-add-product',
//   imports: [CommonModule, FormsModule, RouterLink],
//   templateUrl: './addproduct.html',
//   styleUrls: ['./addproduct.css']
// })
// export class AddProduct {
//   product = {
//     name: '',
//     description: '',
//     price: 0,
//     image: '',
//     category: null
//   };

//   successMessage = '';
//   errorMessage = '';

//   constructor(private dataService: Dataservice, private router: Router) {}

//   saveProduct() {
//     const productToSend = {
//       ...this.product,
//       category: this.product.category ? { id: this.product.category } : null
//     };

//     this.dataService.createProduct(productToSend).subscribe({
//       next: () => {
//         this.successMessage = 'Product added successfully!';
//         this.errorMessage = '';
//         this.product = {
//           name: '',
//           description: '',
//           price: 0,
//           image: '',
//           category: null
//         };
//       },
//       error: (err) => {
//         this.errorMessage = 'Error adding product.';
//         this.successMessage = '';
//         console.error(err);
//       }
//     });
//   }
// }

// import { Component } from '@angular/core';
// import { Router, RouterLink } from '@angular/router';
// import { Dataservice } from '../dataservice';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-add-product',
//   standalone: true,
//   imports: [CommonModule, FormsModule, RouterLink],
//   templateUrl: './addproduct.html',
//   styleUrls: ['./addproduct.css']
// })
// export class AddProduct {
//   product = {
//     name: '',
//     description: '',
//     price: 0,
//     image: '',
//     category: null
//   };

//   successMessage = '';
//   errorMessage = '';

//   constructor(private dataService: Dataservice, private router: Router) {}

//   saveProduct() {
//     // Basic validation
//     if (
//       !this.product.name ||
//       !this.product.description ||
//       !this.product.price ||
//       !this.product.image ||
//       !this.product.category
//     ) {
//       this.errorMessage = 'Please fill in all fields.';
//       this.successMessage = '';
//       return;
//     }

//     const productToSend = {
//       ...this.product,
//       category: { id: this.product.category }
//     };

//     this.dataService.createProduct(productToSend).subscribe({
//       next: () => {
//         this.successMessage = 'Product added successfully!';
//         this.errorMessage = '';
//         // Clear form
//         this.product = {
//           name: '',
//           description: '',
//           price: 0,
//           image: '',
//           category: null
//         };
//         // Optionally navigate
//         // this.router.navigate(['/products']);
//       },
//       error: (err) => {
//         this.errorMessage = 'Error adding product.';
//         this.successMessage = '';
//         console.error(err);
//       }
//     });
//   }
// }


import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Dataservice } from '../dataservice';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Define a proper interface for clarity
interface ProductInput {
  name: string;
  description: string;
  price: number;
  image: string;
  category: number | null;
}

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './addproduct.html',
  styleUrls: ['./addproduct.css']
})
export class AddProduct {
  product: ProductInput = {
    name: '',
    description: '',
    price: 0,
    image: '',
    category: null
  };

  successMessage = '';
  errorMessage = '';

  constructor(private dataService: Dataservice, private router: Router) {}

  saveProduct() {
    // Validate all fields
    if (
      !this.product.name.trim() ||
      !this.product.description.trim() ||
      !this.product.image.trim() ||
      this.product.price <= 0 ||
      this.product.category == null
    ) {
      this.errorMessage = 'Please fill in all fields with valid values.';
      this.successMessage = '';
      return;
    }

    const productToSend = {
      ...this.product,
      category: { id: this.product.category }
    };

    this.dataService.createProduct(productToSend).subscribe({
      next: () => {
        this.successMessage = 'Product added successfully!';
        this.router.navigate(['/productlist']);

        this.errorMessage = '';

        // Optionally reset form
        this.product = {
          name: '',
          description: '',
          price: 0,
          image: '',
          category: null
        };

        
      },
      error: (err) => {
        this.errorMessage = 'Error adding product. Please try again.';
        this.successMessage = '';
        console.error('Create product error:', err);
      }
    });
  }
  ngOnInit(): void {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const role = localStorage.getItem('role');

  if (isLoggedIn !== 'true' || role !== 'ADMIN') {
    alert('Access denied. Admins only.');
    this.router.navigate(['/login']);
  }
}

}
