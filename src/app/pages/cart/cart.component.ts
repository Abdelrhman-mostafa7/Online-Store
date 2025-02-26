import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { Icart } from '../../shared/interfaces/icart';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  private cartService = inject(CartService);

  ngOnInit(): void {
    this.datacart();
  }

  cartdetails: Icart = {} as Icart;

  datacart(): void {
    this.cartService.datacart().subscribe({
      next: (res) => {
        console.log(res.data);
        this.cartdetails = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  removeitemcart(id: string): void {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.removecart(id).subscribe({
          next: (res) => {
            console.log(res.data);
            this.cartdetails = res.data;
            Swal.fire({
              title: "Deleted!",
              text: "Your item has been removed.",
              icon: "success"
            });
            this.cartService.cartNumber.next(res.numOfCartItems)

          },
          error: (err) => {
            console.log(err);
            Swal.fire({
              title: "Error!",
              text: "Failed to remove the item.",
              icon: "error"
            });
          }
        });
      }
    });
  }

  updataitemcart(id: string, count: number): void {
    this.cartService.updatacart(id, count).subscribe({
      next: (res) => {
        console.log(res.data);
        this.cartdetails = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  clearitemcart(): void {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.clearcart().subscribe({
          next: (res) => {
            console.log(res.data);
            if (res.message === "success") {
              this.cartdetails = {} as Icart;
              this.cartService.cartNumber.next(0)

              Swal.fire({
                title: "Deleted!",
                text: "Your cart has been cleared.",
                icon: "success"
              });
            }
          },
          error: (err) => {
            console.log(err);
          }
        });

        
      }
    });
  }
}