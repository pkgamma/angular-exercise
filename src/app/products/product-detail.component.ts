import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  pageTitle: string = 'Product Detail';
  product: IProduct;
  errorMessage: string = '';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService) { }

  ngOnInit(): void {
    console.log('In OnInit of product detail comp');
    let id = +this.route.snapshot.paramMap.get('id');
    this.pageTitle += `: ${id}`;

    this.productService.getProduct(id).subscribe({
      next: product => {
        this.product = product;
      },
      error: err => this.errorMessage = err
    })

    // this.product = {
    //   "productId": id,
    //   "productName": "Garden Cart",
    //   "productCode": "GDN-0023",
    //   "releaseDate": "March 18, 2019",
    //   "description": "15 gallon capacity rolling garden cart",
    //   "price": 32.99,
    //   "starRating": 4.2,
    //   "imageUrl": "assets/images/garden_cart.png"
    // }
  }

  onBack(): void {
    this.router.navigate(['./products'])
  }

}
