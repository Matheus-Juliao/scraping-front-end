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
import { ToastComponent } from './shared/toast/toast.component';
import { ToastModule } from 'primeng/toast';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    HomeComponent,
    CarsComponent,
    LoadingComponent,
    HeaderComponent,
    ToastComponent,
  ],
  imports: [
    CommonModule,
    RoutingModule,
    MultiSelectModule,
    FormsModule,
    HttpClientModule,
    ToastModule,
    BrowserModule,
    BrowserAnimationsModule
    
  ],
  providers: [
    MessageService
  ]
})

export class PagesModule { }
