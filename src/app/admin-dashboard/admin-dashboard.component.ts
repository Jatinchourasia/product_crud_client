import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from './../product-service.service';
import { Product } from './../interfaces/product';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent {
  products: Product[] = [];
  isDeleting = false;
  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  navigateToUser(productId: number): void {
    this.router.navigate(['/admin/update/', productId]);
  }
  delete(productId: number): void {
    this.isDeleting = true;
    this.productService.deleteProduct(productId).subscribe((data) => {
      this.productService.getProducts().subscribe((data) => {
        this.products = data;
        this.isDeleting = false;
      });
    });
  }
}
