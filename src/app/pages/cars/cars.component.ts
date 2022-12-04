import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PagesService } from '../pages.service';
import { MessageService } from 'primeng/api';
import { FormatDate } from 'src/utils/date.utils'

//Json
import dbReference from 'src/assets/reference.json';
import dbBase64 from 'src/assets/base64.json';
import dbResp from 'src/assets/resp.json';

//JSPDF
import { jsPDF } from "jspdf";

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {

  public form: any

  public resp: { mesdereferencia: string, codigoFipe: string, marca: string, modelo: string, anoModelo: string, autenticacao: string, dataDaConsulta: string, precoMedio: string }[] = dbResp;
  public reference: { Codigo: number, Mes: string, Index: number }[] = dbReference;
  public base64: { logo: string }[] = dbBase64;

  public payload: any =  { brand: "", model: "", years: "", initialReference: "", finalReference: "", period: [{}]}
  public desc = [ "MÊS DE REFERÊNCIA: ", "CÓDIGO FIPE: ", "MARCA: ", "MODELO: ", "ANO MODELO: ", "AUTENTICAÇÃO: ", "DATA DA CONSULTA: ", "PREÇO MÉDIO: " ]

  public showLoanding: boolean = false
  public showForm: boolean = false
  public showCuriosities: boolean = true
  
  public hidefinalReference: boolean = true
  public hideModelYear: boolean = true
  public hideBrand: boolean = true
  public showPreviousPeriod: boolean = false

  public iPeriodIndex: number = 0
  public fPeriodIndex: number = 0
  public cont: number = 0

  public results: Array<any> = []
  public response: any

  public msg: string = ""
  public previousPeriod: string = ""
  public consultationDate: string = ""

  public period: any
  public brands: any
  public modelsYears: any
  public models: any
  public years: any
  public printReports: any
  public payloadModel: any
  public payloadYear: any
  

  constructor(private pagesService: PagesService, 
    private messageService: MessageService, 
    private formatDate: FormatDate,
    private router: Router) { 
  }

  ngOnInit(): void {
    //
  }

  public periodReferenceInicial(form: NgForm) {
    this.hidefinalReference = false
    this.cont = this.calcPeriod(form.value)
  }

  public periodReferenceFinal(form: NgForm) {
    this.clearBrand(form)
    this.hideBrand = false
    this.cont = this.calcPeriod(form.value)
    if(this.cont < 0) {
      this.msg = 'O período Inicial deve ser menor ou igual ao período Final'
      this.clearfinalReference(form)
      this.showError(this.msg)
    }
    
    if(this.cont >= 0 && form.value.finalReference !== '') {
        let period: any = { period: form.value.finalReference }
        this.showLoanding = true
        this.pagesService.postPeriod(period).subscribe({
          next: (res: any) => {
            this.brands = res
          },
          error: (err: any) => {
            this.clearfinalReference(form)
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
    this.clearModelYear(form);
    this.hideModelYear = false
    if(form.value.brand !== '') {
      let brand: any = { brand: form.value.brand, period: form.value.finalReference }
      this.showLoanding = true
      this.pagesService.postBrand(brand).subscribe({
        next: (res: any) => {
          this.modelsYears = res
        },
        error: (err: any) => {
          this.clearBrand(form)
          this.msg = 'Erro! Tente novamente!'
          this.showError(this.msg)
          this.showLoanding = false
        },
        complete: () => {
          this.models = this.modelsYears.models
          this.years = this.modelsYears.years
          this.showLoanding = false
        }
      })
    }
  }

  public modelYearCar(form: NgForm, status: string) {
    if((form.value.model != "" && form.value.year == "" && status == "model") || (form.value.model != this.payloadModel?.model && form.value.year != this.payloadYear?.year && this.payloadModel?.model != undefined && form.value.model != "")) {
      this.requestModelYear(form, status)
    }
    if((form.value.year != "" && form.value.model == "" && status == "year") || (form.value.year != this.payloadYear?.year && form.value.model != this.payloadModel?.model && this.payloadYear?.year != undefined && form.value.year != "")) {
      this.requestModelYear(form, status)
    }

  }

  public onSubmit(form: NgForm) {
    this.payload = form.value
    this.showLoanding = true

    let reference = []

    for(let i=0; i<=this.cont; i++) {
      reference[i] = this.reference[this.fPeriodIndex+i].Codigo.toString()
    }

    this.payload.period = reference

    this.request()
  }

  private calcPeriod(payload: any): number {
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

  private requestModelYear(form: NgForm, status: string) {
    let payload: any

    if(status == "model") {
      this.payloadModel = { brand: form.value.brand, model: form.value.model, period: form.value.finalReference,  cod: 1 }
      payload = this.payloadModel
    } 
    if(status == "year") {
      this.payloadYear = { brand: form.value.brand, year: form.value.year, period: form.value.finalReference, cod: 2 }
      payload = this.payloadYear
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
      },
      error: (err: any) => {
        this.clearModelYear(form)
        this.msg = 'Erro! Tente novamente!'
        this.showError(this.msg)
        this.showLoanding = false
      },
    })
  }

  private request () {
    this.pagesService.postForm(this.payload).subscribe({
      next: (res: any) => {
        this.results = res.result
        this.previousPeriod = res.previousPeriod
        this.consultationDate = this.results[0].dataDaConsulta
      },
      error: (err: any) => {
        this.msg = 'Erro! Tente novamente!'
        this.showError(this.msg)
        this.showLoanding = false
      },
      complete: () => {
        if(this.results.length != this.payload.period.length) {
          this.showPreviousPeriod = true

          for(let i of this.payload.period) {
            this.payload.period.pop()
          }
        }
        this.response = this.results
        this.showForm = true
        this.showLoanding = false
        this.showCuriosities = false
      }
    })
  }

  public print(arq: string) {
    this.pagesService.postPrint(this.payload).subscribe({
      next: (res: any) => {
        this.printReports = res
      },
      complete: () => {
        for(let i=0; i<this.printReports.length; i++) {
          this.printReports[i].dataDaConsulta = this.consultationDate
        }

        if(arq == 'pdf')
          this.printPdf(this.printReports)
        else if(arq == 'csv')  
          this.printCsv(this.printReports)
      }
    })
  }

  private printCsv(printReports: any) {

    let csvContent: any;
    let response: any = []

    for(let row of printReports) {
      response.push(row.mesdereferencia)
      response.push(row.codigoFipe )
      response.push(row.marca)
      response.push(row.modelo)
      response.push(row.anoModelo)
      response.push(row.autenticacao)
      response.push(row.dataDaConsulta.replace(':', 'h'))
      response.push(row.precoMedio)
    }

    let j = 0;
    for(let i=0; i<response.length; i++) {
      if(i == 0)
        csvContent = this.desc[j] + response[i] + "\n";  
      else
        csvContent = csvContent + this.desc[j] + response[i] + "\n";

      if(j == 7) {
        csvContent = csvContent + "\n"; 
        j=-1
      }

      j++
    }

    let link = document.createElement("a");
    link.setAttribute("href", "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURI(csvContent));
    link.setAttribute("download", "reports.csv");
    document.body.appendChild(link); 
    link.click();
  }

  public printPdf(printReports: any) {
    const doc = new jsPDF(); 
    const totalPages = (printReports.length % 2 == 0) ? printReports.length / 2 : printReports.length / 2 + 0.5;

    let cont = 0;
    let page = 1;
    let x = 0;
    let y = 0;

    printReports.forEach((print: any) => {
      if (cont % 2 === 0) {
        doc.setFont('times', 'normal');
        doc.setFontSize(12);

        let logo = this.base64[0].logo

        doc.addImage(logo, 'PNG', 20, 5, 40, 10);
        doc.text(`Data da impressão:  ${this.formatDate.getNowDate()}`, 135, 12);
        doc.setFontSize(16);
        doc.text('Relatório de tabela fipe', 80, 25);
        doc.setFontSize(12);

        doc.setFontSize(10);
        doc.text(`Página ${page} de ${totalPages}`, 15, 285);
        doc.text('FipeQuery - All Rights Reserved', 145, 285);

        doc.setFontSize(12);

        let x = 40;
        let y = 40;
        this.descriptionLine(doc, x, y);

        x = 110;
        y = 40;
        this.printRow(doc, print, x, y);
        cont++;

      } else {
        x = 40
        y = 140;
        this.descriptionLine(doc, x, y);

        x = 110
        y = 140;
        this.printRow(doc, print, x, y);

        cont++;
        page++;
                                            
        if(cont !== printReports.length){
          doc.addPage();
        }
      }
    });

    doc.save("reports.pdf");
  }

  private descriptionLine(doc: any, x: number, y: number): void {
    for(let desc of this.desc) {
      doc.text(desc, x, y);
      doc.line(x-1, y+2, 190, y+2);
      y+=10;
    }
  }

  private printRow(doc: any, print: any, x: number, y: number): void {
    doc.text(print.mesdereferencia, x, y);
    y += 10;
    doc.text(print.codigoFipe, x, y);
    y += 10;
    doc.text(print.marca, x, y);
    y += 10;
    doc.text(print.modelo, x, y);
    y += 10;
    doc.text(print.anoModelo, x, y);
    y += 10;
    doc.text(print.autenticacao, x, y);
    y += 10;
    doc.text(print.dataDaConsulta, x, y);
    y += 10;
    doc.text(print.precoMedio, x, y);
  }

  public showButton(form: NgForm) {
    if(form.value.finalReference == '' || form.value.initialReference == '' || form.value.brand == '' || form.value.model == '' || form.value.year == '') {
      return true
    }
    return false
  }

  private showError(msg: string) {
    this.messageService.add({ key: 'app', severity:'error', summary: 'Error', life: 5000, detail: msg });
  }

  public back() {
    this.hidefinalReference = true
    this.hideModelYear = true
    this.hideBrand = true
    this.showForm = false
    this.showCuriosities = true
  }

  private clearfinalReference(form: NgForm) {
    form.setValue({
      initialReference: form.value.initialReference,
      finalReference: '',
      brand: '',
      model: '',
      year: ''
    })
  }

  private clearBrand(form: NgForm) {
    form.setValue({
      initialReference: form.value.initialReference,
      finalReference: form.value.finalReference,
      brand: '',
      model: '',
      year: ''
    })
  }

  private clearModelYear(form: NgForm) {
    form.setValue({
      initialReference: form.value.initialReference,
      finalReference: form.value.finalReference,
      brand: form.value.brand,
      model: '',
      year: ''
    })
  }

  public curiosities() {
    this.router.navigate(['/curiosities'])
  }
}