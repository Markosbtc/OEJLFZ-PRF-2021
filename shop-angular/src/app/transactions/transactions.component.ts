import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactionList$: Observable<Transaction[]>;


  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    /* this.itemService.getTransactions().subscribe(res => {
      console.log(res);
    }); */
    this.getTransactions();
  }

  getTransactions() {
    this.transactionList$ = this.itemService.getTransactions();
  }

}
