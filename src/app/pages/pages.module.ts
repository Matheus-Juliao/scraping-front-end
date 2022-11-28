import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingModule } from './routing.modules';
import { MultiSelectModule } from 'primeng/multiselect';
import { HttpClientModule } from '@angular/common/http'

//Components
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarsComponent } from './cars/cars.component';
import { LoadingComponent } from './loading/loading.component';
import { HeaderComponent } from './shared/header/header.component';
import { ToastComponent } from './shared/toast/toast.component';
import { ToastModule } from 'primeng/toast';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { CuriositiesComponent } from './curiosities/curiosities.component';

@NgModule({
  declarations: [
    HomeComponent,
    CarsComponent,
    LoadingComponent,
    HeaderComponent,
    ToastComponent,
    CuriositiesComponent,
  ],
  imports: [
    CommonModule,
    RoutingModule,
    MultiSelectModule,
    FormsModule,
    HttpClientModule,
    ToastModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    MessageService
  ]
})

export class PagesModule { }
