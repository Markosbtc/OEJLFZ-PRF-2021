import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsComponent } from './transactions.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

const routes: Routes = [
  {
    path: '',
    component: TransactionsComponent,
  },
];

@NgModule({
  declarations: [
    TransactionsComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    RouterModule.forChild(routes)
  ]
})
export class TransactionsModule { }
