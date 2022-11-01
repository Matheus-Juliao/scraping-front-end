import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PagesService } from '../pages.service';

//Json
import dbBrand from 'src/assets/brand.json';
import dbReference from 'src/assets/reference.json';


@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {

  // public brands: { Label: string, Value: string }[] = dbBrand;
  public reference: { Codigo: number, Mes: string, Index: number }[] = dbReference;

  public payload: any =  { 
    brand: "", 
    model: "",  
    years: "", 
    initialReference: "", 
    finalReference: "",
    period: [{}]
  }

  public hidePeriod: boolean = true
  public hideBrand: boolean = true

  public showLoanding: boolean = false
  public showTable: boolean = false
  
  public hideModels: boolean = true
  public hideYears: boolean = true
  

  public results: Array<any> = []
  public response: any

  public period: any
  public brands: any
  public modelsYears: any
  public models: any
  public years: any

  constructor(private pagesService: PagesService) { }

  ngOnInit(): void {
    //
  }

  public onSubmit(form: NgForm) {
    this.payload = form.value

    console.log(this.payload)
    this.showLoanding = true

    let iPeriodIndex: number = 0
    let fPeriodIndex: number = 0

    for(let i=0; i<this.reference.length; i++) {
      if(this.reference[i].Codigo == form.value.initialReference) {
        iPeriodIndex = i
      }
      if(this.reference[i].Codigo == form.value.finalReference) {
        fPeriodIndex = i
      }
    }

    let cont: number = fPeriodIndex - iPeriodIndex
    let reference = []

    for(let i=0; i<=cont; i++) {
      reference[i] = this.reference[i].Codigo.toString()
    }

    this.payload.period = reference
    this.request()

  }

  public request () {
    this.pagesService.postForm(this.payload).subscribe({
      next: (res: any) => {
        this.results = res
      },
      complete: () => {
        this.response = this.results

        console.log(this.response)

        this.showTable = true
        this.showLoanding = false
        this.hideModels = false
        this.hideYears = false
      }
    })
  }

  public periodReferenceInicial(form: NgForm) {
    this.hidePeriod = false
  }

  public periodReferenceFinal(form: NgForm) {
    let period: any = { period: form.value.finalReference }
    console.log(period)
    this.showLoanding = true
    this.pagesService.postPeriod(period).subscribe({
      next: (res: any) => {
        this.brands = res
      },
      complete: () => {
        this.showLoanding = false
        this.hideBrand = false
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
    if(form.value.finalReference == '' || form.value.initialReference == '' || form.value.brand == '' || form.value.model == '') {
      return true
    }
    return false
  }

}
