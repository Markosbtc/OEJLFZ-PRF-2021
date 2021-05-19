import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Item } from '../models/item.model';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient, private router: Router) { }

  getAll(): Observable<Item[]> {
    return this.http.get(environment.serverUrl + '/items', { withCredentials: true })
      .pipe(
        map((res) => res as Item[])
      );
  }

  getById(id: string): Observable<Item> {
    return this.http.get(environment.serverUrl + '/item/' + id, { withCredentials: true })
      .pipe(
        map((res) => res as Item)
      );
  }

  getSoldItems(): Observable<any> {
    return this.http.get(environment.springUrl + '/items');
  }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get(environment.springUrl + '/transactions')
      .pipe(
        map((res) => res as Transaction[])
      );
  }

  saveTransaction(transaction) {
    return this.http.post(environment.springUrl + '/transaction', { item_id: transaction.item_id, sum: transaction.sum, date: transaction.date },
      { responseType: 'text' });
  }


}
