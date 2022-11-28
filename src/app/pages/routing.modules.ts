import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuriositiesComponent } from './curiosities/curiosities.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'curiosities',
    component: CuriositiesComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }