import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingModule } from './routing.modules';
import { MultiSelectModule } from 'primeng/multiselect';
import { HttpClientModule } from '@angular/common/http'

//Components
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { CarsComponent } from './cars/cars.component';
import { LoadingComponent } from './loading/loading.component';
import { HeaderComponent } from './shared/header/header.component';

@NgModule({
  declarations: [
    HomeComponent,
    CarsComponent,
    LoadingComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RoutingModule,
    MultiSelectModule,
    FormsModule,
    HttpClientModule
  ]

})

export class PagesModule { }
