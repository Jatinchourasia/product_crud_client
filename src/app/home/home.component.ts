import { Component } from '@angular/core';

import { UserService } from './../user.service';
import { Router } from '@angular/router';
import { ProductService } from './../product-service.service';
import { Product } from '../interfaces/product';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  products: Product[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private productService: ProductService
  ) {}
  navigateToUser(userId: number): void {
    this.router.navigate(['/product/', userId]);
  }
  getToken(): string | null {
    return this.userService.getToken();
  }

  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }
}
