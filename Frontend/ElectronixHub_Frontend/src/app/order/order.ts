import { Component, OnInit } from '@angular/core';
import { Dataservice } from '../dataservice';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-order',
  imports:[CommonModule,RouterLink,FormsModule],
  templateUrl: './order.html',
  styleUrls: ['./order.css']
})
export class Order implements OnInit {
  username = 'john'; // ✅ Replace with dynamic session-based username if available
  newOrder = {
    totalAmount: 0,
    status: 'Pending'
  };
  orders: any[] = [];

  constructor(private dataService: Dataservice, private router: Router) {}

  ngOnInit(): void {
    this.loadUserOrders();
  }

  placeOrder(): void {
    if (!this.newOrder.totalAmount || this.newOrder.totalAmount <= 0) {
      alert("Total amount must be greater than 0.");
      return;
    }

    this.dataService.placeOrder(this.username, this.newOrder).subscribe({
      next: (order) => {
        alert('Order placed successfully!');
        this.newOrder.totalAmount = 0;
        this.newOrder.status = 'Pending';
        this.loadUserOrders();
      },
      error: (err) => {
        console.error(err);
        alert('Failed to place order.');
      }
    });
  }

  loadUserOrders(): void {
    this.dataService.getUserOrders(this.username).subscribe({
      next: (orders) => {
        this.orders = orders;
      },
      error: (err) => {
        console.error(err);
        alert('Failed to load orders.');
      }
    });
  }
}
