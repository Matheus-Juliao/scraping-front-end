import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PagesService } from '../pages.service';

//Json
import dbReference from 'src/assets/reference.json';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {

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

  public showLoanding: boolean = true
  public showForm: boolean = false
  
  public hideModels: boolean = true
  public hideYears: boolean = true

  public iPeriodIndex: number = 0
  public fPeriodIndex: number = 0

  public cont: number = 0
  
  public results: Array<any> = []
  public response: any

  public msg: string = ""

  public period: any
  public brands: any
  public modelsYears: any
  public models: any
  public years: any

  constructor(private pagesService: PagesService, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
    //
  }

  public onSubmit(form: NgForm) {
    this.payload = form.value
    this.showLoanding = true

    let reference = []

    for(let i=0; i<=this.cont; i++) {
      reference[i] = this.reference[i].Codigo.toString()
    }

    this.payload.period = reference
    this.request()

  }

  public calcPeriod(payload: any): number {
    for(let i=0; i<this.reference.length; i++) {
      if(this.reference[i].Codigo === parseInt(payload.initialReference) ) {
        this.iPeriodIndex = i
      }
      if(this.reference[i].Codigo === parseInt(payload.finalReference)) {
        this.fPeriodIndex = i
      }
    }

    return this.iPeriodIndex - this.fPeriodIndex
  }

  public request () {
    this.pagesService.postForm(this.payload).subscribe({
      next: (res: any) => {
        this.results = res
      },
      complete: () => {
        this.response = this.results
        this.showForm = true
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
    this.cont = this.calcPeriod(form.value)

    if(this.cont < 0) {
      this.msg = 'O período Inicial deve ser menor ou igual ao período Final'
      this.showError(this.msg)
    } else {
        let period: any = { period: form.value.finalReference }
        this.showLoanding = true
        this.pagesService.postPeriod(period).subscribe({
          next: (res: any) => {
            this.brands = res
          },
          error: (err: any) => {
            this.msg = 'Erro! Tente novamente!'
            this.showError(this.msg)
            this.showLoanding = false
          },
          complete: () => {
            this.showLoanding = false
            this.hideBrand = false
          }
      })
    }
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
    if(form.value.model.length === 0 && form.value.year.length > 0 
      || form.value.model.length > 0 && form.value.year.length === 0 ) {
      let payload: any 
      if(form.value.model !== "") {
        payload = { brand: form.value.brand, model: form.value.model, cod: 1 }
      } 
      if(form.value.year !== "") {
        payload = { brand: form.value.brand, year: form.value.year, cod: 2 }
      }
  
      this.showLoanding = true
  
      this.pagesService.postModelYear(payload).subscribe({
        next: (res: any) => {
          this.modelsYears = res
        },
        complete: () => {

          if(payload.cod === 1)
            this.years = this.modelsYears.years
          if(payload.cod === 2)
            this.models = this.modelsYears.models
          
          this.showLoanding = false
          this.hideModels = false
          this.hideYears = false
        }
      })
    }

  }

  public showButton(form: NgForm) {
    if(form.value.finalReference === '' || form.value.initialReference === '' || form.value.brand === '' || form.value.model === '') {
      return true
    }
    return false
  }

  public showError(msg: string) {
    this.messageService.add({ key: 'app', severity:'error', summary: 'Error', life: 5000, detail: msg });
  }

  public back() {
    this.showForm = false
  }

}
