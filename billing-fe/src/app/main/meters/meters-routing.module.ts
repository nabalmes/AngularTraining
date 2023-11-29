import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetersComponent } from './meters.component';
import { MeterFormComponent } from './meter-form/meter-form.component';
import { MeterResolver } from 'app/common/resolvers/meter.resolver';

const routes: Routes = [
  {
    path: '',
    component: MetersComponent
  },
  {
    path: 'add',
    component: MeterFormComponent,
    data: {
      title: 'Add New Meter',
      breadcrumb: "New"
    }
  },
  {
    path: 'edit/:id',
    component: MeterFormComponent,
    data: {
      title: 'Edit Meter',
      breadcrumb: "Edit"
    },
    resolve: {Meter: MeterResolver},
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MetersRoutingModule { }
