import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product-service.service';
import { Product } from '../interfaces/product';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TemplateBindingParseResult } from '@angular/compiler';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent implements OnInit {
  updateProductForm!: FormGroup;
  productId!: string | null;
  product!: Product;
  isSubmitting = false;
  selectedImage: string | ArrayBuffer | null = null;
  file: File | null = null;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.updateProductForm = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      photo: [''],
      category: ['', [Validators.required]],
      stock: ['', [Validators.required]],
    });

    // Get the product ID from the URL parameters
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('id');
      // Make an API call to get the product data using the ID
      if (this.productId !== null) {
        this.productService.getProduct(this.productId).subscribe((product) => {
          this.product = product;
          // Use the setValue method to populate the form fields with the product data
          this.updateProductForm.setValue({
            name: this.product.name,
            price: this.product.price,
            description: this.product.description,
            photo: '',
            category: this.product.category,
            stock: this.product.stock,
          });
          this.selectedImage = this.product.photo.secure_url;
        });
      }
    });
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      // Read the file and convert it to a data URL
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
      };
      reader.readAsDataURL(this.file);
    }
  }

  onSubmit(): void {
    if (this.updateProductForm.valid) {
      this.isSubmitting = true;
      TemplateBindingParseResult;
      const formData = new FormData();
      formData.append('name', this.updateProductForm.value.name);
      formData.append('price', this.updateProductForm.value.price);
      formData.append('description', this.updateProductForm.value.description);
      formData.append('category', this.updateProductForm.value.category);
      formData.append('stock', this.updateProductForm.value.stock);
      if (this.file) {
        formData.append('photo', this.file, this.file.name);
      }

      this.route.paramMap.subscribe((params) => {
        this.productId = params.get('id');
        // Make an API call to get the product data using the ID
        if (this.productId !== null) {
          this.productService
            .updateProduct(this.productId, formData)
            .subscribe((product) => {
              this.isSubmitting = false;
              this.product = product;
              // Use the setValue method to populate the form fields with the product data
              this.updateProductForm.setValue({
                name: this.product.name,
                price: this.product.price,
                description: this.product.description,
                photo: '',
                category: this.product.category,
                stock: this.product.stock,
              });

              this.snackBar.open('Product update success.', 'Close', {
                duration: 3000,
              });

              this.updateProductForm.reset();
              this.router.navigate(['/admin']);
            });
        }
      });
    } else {
      console.log('Invalid form');
    }
  }
}
