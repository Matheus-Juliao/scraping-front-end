import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import dbBrand from 'src/assets/brand.json';
import { NgForm } from '@angular/forms';
import { PagesService } from '../pages.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {

  public brands: { Label: string, Value: string }[] = dbBrand;

  private payload: any = { 
    brand: undefined, 
    model: undefined,  
    years: undefined, 
    initialReference: undefined, 
    finalReference: undefined
  }

  public showLoanding: boolean = false
  public showTable: boolean = false
  public hideModels: boolean = true
  public hideYears: boolean = true
  public results: any
  public response: any
  public modelsYears: any
  public dbModels: any
  public models: any
  public years: any

  constructor(private pagesService: PagesService) { }

  ngOnInit(): void {
    //
  }

  public onSubmit(form: NgForm) {
    this.payload = form.value
    this.showLoanding = true
    this.pagesService.postForm(this.payload).subscribe({
      next: (res: any) => {
        this.results = res
      },
      complete: () => {
        this.response = this.results
        this.showTable = true

        this.showLoanding = false
        this.hideModels = false
        this.hideYears = false
      }
    })
  }

  public brandCar(form: NgForm) {
    let brand: any = { brand: form.value.brand }
    this.showLoanding = true
    this.pagesService.postBrand(brand).subscribe({
      next: (res: any) => {
        this.modelsYears = res
      },
      complete: () => {
        this.models = this.modelsYears.models
        this.years = this.modelsYears.years
        this.showLoanding = false
        this.hideModels = false
        this.hideYears = false
      }
    })
  }

  public modelYearCar(form: NgForm) {
    let payload: any 
    if(form.value.model != "") {
      payload = { brand: form.value.brand, model: form.value.model, cod: 1 }
    } 
    if(form.value.year != "") {
      payload = { brand: form.value.brand, year: form.value.year, cod: 2 }
    }

    this.showLoanding = true

    this.pagesService.postModelYear(payload).subscribe({
      next: (res: any) => {
        this.modelsYears = res
      },
      complete: () => {
        this.models = this.modelsYears.models
        this.years = this.modelsYears.years
        this.showLoanding = false
        this.hideModels = false
        this.hideYears = false
      }
    })
  }

  public showButton(form: NgForm) {
    if(form.value.brand == '' || form.value.model == '') {
      return true
    }
    return false
  }

}
