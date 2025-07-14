
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports:[CommonModule,RouterOutlet,RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  title = 'Welcome to ElectronixHub';
  subtitle = 'Your one-stop shop for the latest electronics.';

  featuredProducts = [
    {
      name: 'Smartphone X',
      description: 'Latest model with advanced features.',
      image: 'assets/smartphone1.jpg'
    },
    {
      name: 'Laptop Pro',
      description: 'High-performance laptop for professionals.',
      image: 'assets/laptop.jpg'
    },
    {
      name: 'Wireless Headphones',
      description: 'Noise-cancelling, long battery life.',
      image: 'assets/headphone.jpg'
    },
    {
      name: 'Smartwatch',
      description: 'Track your fitness and stay connected.',
      image: 'assets/smartwatch.webp'
    },
    {
      name: 'Gaming Mouse',
      description: 'Logitech G-series Gaming Mouse.',
      image: 'assets/mouse.jpg'
    },
    {
      name: 'Smartphone X',
      description: 'Latest model with advanced features.',
      image: 'assets/smartphone1.jpg'
    },
    {
      name: 'Laptop Pro',
      description: 'High-performance laptop for professionals.',
      image: 'assets/laptop.jpg'
    },
    {
      name: 'Wireless Headphones',
      description: 'Noise-cancelling, long battery life.',
      image: 'assets/headphone.jpg'
    },
    {
      name: 'Smartwatch',
      description: 'Track your fitness and stay connected.',
      image: 'assets/smartwatch.webp'
    },
    {
      name: 'Gaming Mouse',
      description: 'Logitech G-series Gaming Mouse.',
      image: 'assets/mouse.jpg'
    },
    {
      name: 'Smartphone X',
      description: 'Latest model with advanced features.',
      image: 'assets/smartphone1.jpg'
    },
    {
      name: 'Laptop Pro',
      description: 'High-performance laptop for professionals.',
      image: 'assets/laptop.jpg'
    },
    {
      name: 'Wireless Headphones',
      description: 'Noise-cancelling, long battery life.',
      image: 'assets/headphone.jpg'
    },
    {
      name: 'Smartwatch',
      description: 'Track your fitness and stay connected.',
      image: 'assets/smartwatch.webp'
    },
    {
      name: 'Gaming Mouse',
      description: 'Logitech G-series Gaming Mouse.',
      image: 'assets/mouse.jpg'
    }
  ];
}

