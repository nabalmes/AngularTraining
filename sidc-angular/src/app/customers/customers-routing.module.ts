import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { CustomersComponent } from './customers.component';



const routes: Routes = [
  {
    path: '', 
    component: CustomersComponent
  },
  {
    path: 'add', 
    component: CustomerComponent,
    data: {
      title: 'Add Customer', 
      permission: "add_customer"
    }
  },
  {
    path: 'edit', 
    component: CustomerComponent,
    data: {
      title: 'Edit Customer', 
      permission: "edit_customer"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
