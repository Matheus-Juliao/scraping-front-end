import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PagesService } from '../pages.service';

//Json
import dbReference from 'src/assets/reference.json';
import { MessageService } from 'primeng/api';

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
  public showForm: boolean = false
  
  public hideModels: boolean = true
  public hideYears: boolean = true


  public iPeriodIndex: number = 0
  public fPeriodIndex: number = 0

  
  public titleTable: Array<string> = [
    "Mês de referência",
    "Código Fipe",
    "Marca",
    "Modelo",
    "Ano modelo",
    "Autenticação",
    "Data da consulta",
    "Preço médio" 
  ]
  
  public results: Array<any> = []
  public response: any

  public period: any
  public brands: any
  public modelsYears: any
  public models: any
  public years: any

  constructor(private pagesService: PagesService, private messageService: MessageService) { }

  ngOnInit(): void {
    //
  }

  public onSubmit(form: NgForm) {
    this.payload = form.value
    this.showLoanding = true

    let cont = this.calcPeriod(this.payload)

    let reference = []

    for(let i=0; i<=cont; i++) {
      reference[i] = this.reference[i].Codigo.toString()
    }

    this.payload.period = reference
    this.request()

  }

  public calcPeriod(payload: any): number {
    for(let i=0; i<this.reference.length; i++) {
      if(this.reference[i].Codigo === payload.initialReference) {
        this.iPeriodIndex = i
      }
      if(this.reference[i].Codigo === payload.finalReference) {
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
    let cont = this.calcPeriod(form.value)

    if(cont < 0) {
      this.showError()
    } else {
        let period: any = { period: form.value.finalReference }
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
          this.models = this.modelsYears.models
          this.years = this.modelsYears.years
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

  public showError() {
    this.messageService.add({ key: 'app', severity:'error', summary: 'Error', life: 5000, detail: 'O período Inicial deve ser menor ou igual ao período Final'});
  }

  public back() {
    this.showForm = false
  }

}
