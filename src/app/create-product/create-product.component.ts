import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../product-service.service';
@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent implements OnInit {
  productForm!: FormGroup;
  file: File | null = null;
  selectedImage: string | ArrayBuffer | null = null;
  isSubmitting = false;
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required]],
      photo: ['', [Validators.required]],
      category: ['', [Validators.required]],
      stock: ['', [Validators.required, Validators.min(0)]],
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
    if (this.productForm.valid) {
      this.isSubmitting = true;

      const formData = new FormData();
      formData.append('name', this.productForm.value.name);
      formData.append('price', this.productForm.value.price);
      formData.append('description', this.productForm.value.description);
      formData.append('category', this.productForm.value.category);
      formData.append('stock', this.productForm.value.stock);
      if (this.file) {
        formData.append('photo', this.file, this.file.name);
      }

      this.productService.createProduct(formData).subscribe(
        (response) => {
          this.isSubmitting = true;

          this.snackBar.open('Please fix the errors in the form.', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['/']);
          this.productForm.reset();
        },
        (error) => {
          this.isSubmitting = true;

          this.snackBar.open('Product creation failed.', 'Close', {
            duration: 3000,
          });
        }
      );
    } else {
      console.log('Invalid form');
    }
  }
}
