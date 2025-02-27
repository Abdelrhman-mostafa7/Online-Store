import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/proudcts/product.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CategoryService } from '../../core/services/categories/category.service';
import { Icategory } from '../../shared/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { FormsModule } from '@angular/forms';
import { ProductsComponent } from "../products/products.component";

@Component({
  selector: 'app-home',
  imports: [CarouselModule, FormsModule, ProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  
  search:string=''
  custMainpsliader: OwlOptions = {
    loop: true,
    mouseDrag: true,
    rtl:true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout:4000,
    autoplayHoverPause:true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items:1,

    nav: false
  }

  customOptions: OwlOptions = {
    loop: true,
    rtl:true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout:4000,
    autoplayHoverPause:true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }
  private readonly productService = inject(ProductService)


  product:Iproduct[]=[]
  getproductsdata():void{
    this.productService.getِAllproudcts().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.product=res.data
      },
      error:(res)=>{
        console.log(res)
      }
    })

  }

//=================================================================
private readonly categoryService = inject(CategoryService)
category:Icategory[]=[]
getcategorydata():void{
  this.categoryService.getAllcategry().subscribe({
    next:(res)=>{
      console.log(res.data)
      this.category=res.data
    },
    error:(err)=>{
      console.log(err)
    }

  })

}
ngOnInit(): void {
  this.getproductsdata();
  this.getcategorydata();
}
}

