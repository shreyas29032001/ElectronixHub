// // import { HttpClient } from '@angular/common/http';
// // import { Injectable } from '@angular/core';
// // import { Observable } from 'rxjs';

// // @Injectable({
// //   providedIn: 'root'
// // })
// // export class Dataservice {
// //   private apiUrl = 'http://localhost:8080/api/auth';
// //   private productApiUrl = 'http://localhost:8080/api/products';

// //   constructor(private http: HttpClient) {}

// //   // Test backend connection
// //   getConnection(): Observable<string> {
// //     return this.http.get(this.apiUrl, { responseType: 'text' });
// //   }

// //   // Get all users
// //   getUsers(): Observable<any[]> {
// //     return this.http.get<any[]>(`${this.apiUrl}/users`);
// //   }

// //   // Register a new user
// //   register(user: any): Observable<any> {
// //     return this.http.post<any>(`${this.apiUrl}/register`, user);
// //   }

// //   // Login user
// //   login(user: any): Observable<any> {
// //     return this.http.post<any>(`${this.apiUrl}/login`, user);
// //   }

// //   // Get all products
// //   getProducts(): Observable<any[]> {
// //     return this.http.get<any[]>(this.productApiUrl);
// //   }
// //   getAllProducts(): Observable<any[]> {
// //     return this.http.get<any[]>(this.productApiUrl);
// //   }
  
// //   // Create a new product
// //   createProduct(product: any): Observable<any> {
// //     return this.http.post<any>(`${this.productApiUrl}/create`, product);
// //   }
// //   // Delete a product
// //   deleteProduct(id: number): Observable<void> {
// //   return this.http.delete<void>(`${this.productApiUrl}/${id}`);
// // }
// // // Update product
// // updateProduct(id: number, product: any): Observable<any> {
// //   return this.http.put<any>(`${this.productApiUrl}/${id}`, product);
// // }
// // getProductById(id: number): Observable<any> {
// //   return this.http.get<any>(`${this.productApiUrl}/${id}`);
// // }

// // // Cart data
// // addCartItem(username: string, cartItem: any) {
// //   return this.http.post(`http://localhost:8080/api/cart/${username}/add`, cartItem);
// // }

// // getCartItems(username: string) {
// //   return this.http.get<any[]>(`http://localhost:8080/api/cart/${username}`);
// // }

// // removeCartItem(username: string, productId: number) {
// //   return this.http.delete(`http://localhost:8080/api/cart/${username}/remove/${productId}`, {
// //     responseType: 'text' as 'json'  // This tells Angular to accept plain text
// //   });
// // }


// // clearCart(username: string) {
// //   return this.http.delete(`http://localhost:8080/api/cart/${username}/clear`);
// // }






// // }

// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable, BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class Dataservice {
//   private apiUrl = 'http://localhost:8080/api/auth';
//   private productApiUrl = 'http://localhost:8080/api/products';

//   private cartItemCount = new BehaviorSubject<number>(0); // ✅ Add this line

//   constructor(private http: HttpClient) {}

//   // Expose cart count as observable
//   getCartItemCount(): Observable<number> {
//     return this.cartItemCount.asObservable();
//   }

//   // Manually update cart count
//   setCartItemCount(count: number): void {
//     this.cartItemCount.next(count);
//   }

//   // Optionally load from server and update cart count
//   loadCartItemCount(username: string): void {
//     this.getCartItems(username).subscribe((items) => {
//       this.cartItemCount.next(items.length);
//     });
//   }

//   // Backend connection test
//   getConnection(): Observable<string> {
//     return this.http.get(this.apiUrl, { responseType: 'text' });
//   }

//   getUsers(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiUrl}/users`);
//   }

//   register(user: any): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/register`, user);
//   }

//   login(user: any): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/login`, user);
//   }

//   getProducts(): Observable<any[]> {
//     return this.http.get<any[]>(this.productApiUrl);
//   }

//   getAllProducts(): Observable<any[]> {
//     return this.http.get<any[]>(this.productApiUrl);
//   }

//   createProduct(product: any): Observable<any> {
//     return this.http.post<any>(`${this.productApiUrl}/create`, product);
//   }

//   deleteProduct(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.productApiUrl}/${id}`);
//   }

//   updateProduct(id: number, product: any): Observable<any> {
//     return this.http.put<any>(`${this.productApiUrl}/${id}`, product);
//   }

//   getProductById(id: number): Observable<any> {
//     return this.http.get<any>(`${this.productApiUrl}/${id}`);
//   }

//   // 🛒 Cart methods

//   addCartItem(username: string, cartItem: any) {
//     return this.http.post(`http://localhost:8080/api/cart/${username}/add`, cartItem);
//   }

//   getCartItems(username: string) {
//     return this.http.get<any[]>(`http://localhost:8080/api/cart/${username}`);
//   }

//   removeCartItem(username: string, productId: number) {
//     return this.http.delete(`http://localhost:8080/api/cart/${username}/remove/${productId}`, {
//       responseType: 'text' as 'json'
//     });
//   }

//   clearCart(username: string) {
//     return this.http.delete(`http://localhost:8080/api/cart/${username}/clear`);
//   }
// }

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Dataservice {
  private apiUrl = 'http://localhost:8080/api/auth';
  private productApiUrl = 'http://localhost:8080/api/products';
  private orderApiUrl = 'http://localhost:8080/api/orders'; // ✅ Order API base URL

  private cartItemCount = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {}

  // 🔄 Cart Count Methods
  getCartItemCount(): Observable<number> {
    return this.cartItemCount.asObservable();
  }

  setCartItemCount(count: number): void {
    this.cartItemCount.next(count);
  }

  loadCartItemCount(username: string): void {
    this.getCartItems(username).subscribe((items) => {
      this.cartItemCount.next(items.length);
    });
  }

  // 🧪 Test connection
  getConnection(): Observable<string> {
    return this.http.get(this.apiUrl, { responseType: 'text' });
  }

  // 👤 Auth
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }

  login(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, user);
  }

  // 📦 Products
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.productApiUrl);
  }

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.productApiUrl);
  }

  createProduct(product: any): Observable<any> {
    return this.http.post<any>(`${this.productApiUrl}/create`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.productApiUrl}/${id}`);
  }

  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put<any>(`${this.productApiUrl}/${id}`, product);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.productApiUrl}/${id}`);
  }

  // 🛒 Cart
  addCartItem(username: string, cartItem: any) {
    return this.http.post(`http://localhost:8080/api/cart/${username}/add`, cartItem);
  }

  getCartItems(username: string) {
    return this.http.get<any[]>(`http://localhost:8080/api/cart/${username}`);
  }

  removeCartItem(username: string, productId: number) {
    return this.http.delete(`http://localhost:8080/api/cart/${username}/remove/${productId}`, {
      responseType: 'text' as 'json'
    });
  }

  clearCart(username: string) {
    return this.http.delete(`http://localhost:8080/api/cart/${username}/clear`);
  }

  // ✅📦 Orders

  // Place a new order
  placeOrder(username: string, order: any): Observable<any> {
    return this.http.post(`${this.orderApiUrl}/${username}/place`, order);
  }

  // Get all orders of a user
  getUserOrders(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.orderApiUrl}/${username}`);
  }

  // Get all orders (admin)
  getAllOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.orderApiUrl}/all`);
  }

  // Get a specific order by ID
  getOrderById(orderId: number): Observable<any> {
    return this.http.get<any>(`${this.orderApiUrl}/details/${orderId}`);
  }
}
