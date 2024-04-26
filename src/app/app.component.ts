import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ProductService } from './core/services/product.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userRegister: any = {
    "CustId": 0,
    "Name": "",
    "MobileNo": "",
    "Password": ""
  };
  loginObj: any = {
    "UserName": "string",
    "UserPassword": "string"
  }

  cartData: any[] = [];
  loggedUSerData: any;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Check if localStorage is available
    if (typeof localStorage !== 'undefined') {
      // Access localStorage here
      const localData = localStorage.getItem('ecomUser');
      if (localData !== null) {
        this.loggedUSerData = JSON.parse(localData);
      }
    } else {
      // Provide alternative behavior or handle the case where localStorage is not available
      console.log('localStorage is not available.');
    }

    this.productService.onCartUpdated$.subscribe(res => {
      if (res) {
        this.getCart();
      }
    });

    this.getCart();
  }

  getCart() {
    if (this.loggedUSerData) {
      this.productService.getCartDataByCustId(this.loggedUSerData.custId).subscribe((res: any) => {
        if (res.result) {
          this.cartData = res.data;
        } else {
          alert(res.message);
        }
      });
    }
  }

  removeCartProduct(cartId: number) {
    this.productService.removeProduct(cartId).subscribe((res: any) => {
      if (res.result) {
        this.getCart();
      } else {
        alert(res.message);
      }
    });
  }

  onRegister() {
    this.productService.onRegister(this.userRegister).subscribe((res: any) => {
      if (res.result) {
        alert("Signup Success");
      } else {
        alert(res.message);
      }
    });
  }

  onLogin() {
    this.productService.onLogin(this.loginObj).subscribe((res: any) => {
      if (res.result) {
        alert("Login Success");
        this.loggedUSerData = res.data;
        localStorage.setItem('ecomUser', JSON.stringify(res.data));
      } else {
        alert(res.message);
      }
    });
  }

  logOff() {
    localStorage.removeItem('ecomUser');
    this.loggedUSerData = undefined;
  }
}
