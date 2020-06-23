import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle: string = "Product List";
    imageWidth: number = 50;
    imageHeight: number = 90;
    imageMargin: number = 2;
    showImage: boolean = true;
    errorMessage: string = '';

    _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    constructor(private productService: ProductService) {
    }

    onRatingClicked(message: string): void {
        this.pageTitle = "Yes indeed, " + message;
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter(
            (product: IProduct) => product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1
        );
    }

    filteredProducts: IProduct[];

    products: IProduct[] = [];

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    clearInput(): void {
        this.listFilter = '';
    }

    ngOnInit(): void {
        console.log('In OnInit of product list comp');
        this.productService.getProducts().subscribe({
            next: products => {
                this.products = products;
                this.filteredProducts = this.products;
            },
            error: err => this.errorMessage = err
        });
        // next line doesnt work yet, idk why, should i unsub first?
        this.listFilter = 'cart';
    }
}