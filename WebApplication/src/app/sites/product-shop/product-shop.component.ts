import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {User} from "../../user/User";
import {UserService} from "../../user/User.service";

@Component({
  selector: 'app-product-shop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-shop.component.html',
  styleUrl: './product-shop.component.css'
})
export class ProductShopComponent  implements OnInit{

  users: User[];

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.findAll()
      .subscribe(data => this.users = data);
  }

}
