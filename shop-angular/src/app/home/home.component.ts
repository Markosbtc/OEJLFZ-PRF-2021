import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  itemList$: Observable<Item[]>;
  cartItemIds: string[] = [];
  empty: boolean = false;

  constructor(
    private itemService: ItemService,
    public router: Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this.itemList$ = this.itemService.getAll()
    this.itemList$.subscribe((res) => {
      if (res.length == 0) this.empty = true;
    })
  }

  adToCart(id: string) {
    this.cartItemIds.push(id);
    this.snackBar.open('Item successfully added to cart!', null, {
      duration: 2000,
    });
  }

}
