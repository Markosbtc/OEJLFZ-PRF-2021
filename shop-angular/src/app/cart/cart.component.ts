import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../models/item.model';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  itemList: Item[] = [];
  itemIDs: string[] = [];
  empty: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.itemIDs = params.get('items').split(",");
    });
    this.getCartItems();
  }

  getCartItems() {
    if (this.itemIDs.length > 0 && this.itemIDs[0] != "") {
      this.itemIDs.forEach(id => {
        this.itemService.getById(id).subscribe((res) => {
          this.itemList.push(res);
        })
      });
      this.empty = false;
    }
  }

  removeItem(item: Item) {
    const index = this.itemList.indexOf(item);
    if (index > -1) {
      this.itemList.splice(index, 1);
    }
    if (this.itemList.length == 0) this.empty = true;
  }

  buy() {
    let idstring = this.itemList[0].id;
    let sum = this.itemList[0].price;
    
    if (this.itemList.length > 1) {
      sum = 0;
      this.itemList.forEach(item => {
        idstring += item.id + ', ';
        sum += item.price;
      });
      idstring = idstring.slice(0, -2);
    }

    let transaction = {
      item_id: idstring,
      sum: sum,
      date: new Date()
    }

    this.itemService.saveTransaction(transaction).subscribe(res => {
      this.snackBar.open(res, null, {
        duration: 2000,
      });
      this.router.navigate(['home']);
    }, err => {
      console.error(err);
      this.snackBar.open(err, null, {
        duration: 2000,
      });
    })
  }
}
