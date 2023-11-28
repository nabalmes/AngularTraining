import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AccountsComponent } from './accounts/accounts.component';

const routes: Routes = [
  {
    path: '', component: MainComponent
  },
  {
    path: 'customers', children: [
      {
        path: '',
        loadChildren: () => import('./customers/customers.module').then((m) => m.CustomersModule)
      }
    ]
  },
  {
    path: 'accounts', component: AccountsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
