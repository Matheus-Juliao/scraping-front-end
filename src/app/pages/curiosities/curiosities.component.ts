import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PagesService } from '../pages.service';
import { FormatDate } from 'src/utils/date.utils';

//JSPDF
import { jsPDF } from "jspdf";

//Json
import dbBase64 from 'src/assets/base64.json';

@Component({
  selector: 'app-curiosities',
  templateUrl: './curiosities.component.html',
  styleUrls: ['./curiosities.component.scss']
})
export class CuriositiesComponent implements OnInit {
  public response: any
  public results: any

  public msg: string = ""

  public base64: { logo: string }[] = dbBase64;
  public desc = [ "MÊS DE REFERÊNCIA: ", "CÓDIGO FIPE: ", "MARCA: ", "MODELO: ", "ANO MODELO: ", "AUTENTICAÇÃO: ", "DATA DA CONSULTA: ", "PREÇO MÉDIO: " ]

  public showTable: boolean = false
  public showLoanding: boolean = false
  public showMoreExpensive: boolean = true
  public showCheapest: boolean = true
  public showLessPowerful: boolean = true
  public showMoreEconomical: boolean = true
  public showLessEconomical: boolean = true
  public pMoreExpensive: boolean = false
  public pCheapest: boolean = false
  public pLessPowerful: boolean = false
  public pMoreEconomical: boolean = false
  public pLessEconomical: boolean = false
  public showImgQuestion: boolean = true

  constructor(private pagesService: PagesService, 
    private messageService: MessageService,
    private formatDate: FormatDate) { 
  }

  ngOnInit(): void {
  }

  public moreExpensive() {
    this.pagesService.postMoreExpensive().subscribe({
      next: (res: any) => {
        this.results = res
      },
      error: (err: any) => {
        this.msg = 'Erro! Tente novamente!'
        this.showError(this.msg)
        this.showLoanding = false
      },
      complete: () => {
        this.response = this.results
        this.showTable = true
        this.showLoanding = false
        this.pMoreExpensive = true
        this.pCheapest = false
        this.pLessPowerful = false
        this.pMoreEconomical = false
        this.pLessEconomical = false
        this.showImgQuestion = false

        if(window.innerWidth < 900) {
          this.showCheapest = false
          this.showLessPowerful = false
          this.showMoreEconomical = false
          this.showLessEconomical = false
        } 
      }
    })
  }

  public cheapest() {
    this.pagesService.postCheapest().subscribe({
      next: (res: any) => {
        this.results = res
      },
      error: (err: any) => {
        this.msg = 'Erro! Tente novamente!'
        this.showError(this.msg)
        this.showLoanding = false
      },
      complete: () => {
        this.response = this.results
        this.showTable = true
        this.showLoanding = false
        this.pCheapest = true
        this.pMoreExpensive = false
        this.pLessPowerful = false
        this.pMoreEconomical = false
        this.pLessEconomical = false
        this.showImgQuestion = false

        if(window.innerWidth < 900) {
          this.showMoreExpensive = false
          this.showLessPowerful = false
          this.showMoreEconomical = false
          this.showLessEconomical = false
        }
      }
    })
  }

  public lessPowerful() {
    this.pagesService.postLessPowerful().subscribe({
      next: (res: any) => {
        this.results = res
      },
      error: (err: any) => {
        this.msg = 'Erro! Tente novamente!'
        this.showError(this.msg)
        this.showLoanding = false
      },
      complete: () => {
        this.response = this.results
        this.showTable = true
        this.showLoanding = false
        this.pLessPowerful = true
        this.pMoreExpensive = false
        this.pCheapest = false
        this.pMoreEconomical = false
        this.pLessEconomical = false
        this.showImgQuestion = false

        if(window.innerWidth < 900) {
          this.showMoreExpensive = false
          this.showCheapest = false
          this.showMoreEconomical = false
          this.showLessEconomical = false
        }
      }
    })
  }

  public moreEconomical() {
    this.pagesService.postMoreEconomical().subscribe({
      next: (res: any) => {
        this.results = res
      },
      error: (err: any) => {
        this.msg = 'Erro! Tente novamente!'
        this.showError(this.msg)
        this.showLoanding = false
      },
      complete: () => {
        this.response = this.results
        this.showTable = true
        this.showLoanding = false
        this.pMoreEconomical = true
        this.pMoreExpensive = false
        this.pCheapest = false
        this.pLessPowerful = false
        this.pLessEconomical = false
        this.showImgQuestion = false

        if(window.innerWidth < 900) {
          this.showMoreExpensive = false
          this.showCheapest = false
          this.showLessPowerful = false
          this.showLessEconomical = false
        }
      }
    })
  }

  public lessEconomical() {
    this.pagesService.postLessEconomical().subscribe({
      next: (res: any) => {
        this.results = res
      },
      error: (err: any) => {
        this.msg = 'Erro! Tente novamente!'
        this.showError(this.msg)
        this.showLoanding = false
      },
      complete: () => {
        this.response = this.results
        this.showTable = true
        this.showLoanding = false
        this.pLessEconomical = true
        this.pMoreExpensive = false
        this.pCheapest = false
        this.pLessPowerful = false
        this.pMoreEconomical = false
        this.showImgQuestion = false

        if(window.innerWidth < 900) {
          this.showMoreExpensive = false
          this.showCheapest = false
          this.showLessPowerful = false
          this.showMoreEconomical = false
        }
      }
    })
  }

  public back() {
    this.showTable = false
    this.showMoreExpensive = true
    this.showCheapest = true
    this.showLessPowerful = true
    this.showMoreEconomical = true
    this.showLessEconomical = true
    this.pMoreExpensive = false
    this.pCheapest = false
    this.pLessPowerful = false
    this.pMoreEconomical = false
    this.pLessEconomical = false
    this.showImgQuestion = true
    this.showImgQuestion = true
  }

  public print(endPoint: string) {
    this.pagesService.postPrintView(endPoint).subscribe({
      next: (res: any) => {
        this.results = res
      },
      complete: () => {
        this.printPdf(this.results)
      }
    })
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
    doc.text(print.reference_month, x, y);
    y += 10;
    doc.text(print.fipe_code, x, y);
    y += 10;
    doc.text(print.brand, x, y);
    y += 10;
    doc.text(print.model, x, y);
    y += 10;
    doc.text(print.model_year, x, y);
    y += 10;
    doc.text(print.authentication, x, y);
    y += 10;
    doc.text(print.consultationDate, x, y);
    y += 10;
    doc.text(print.average_price, x, y);
  }

  private showError(msg: string) {
    this.messageService.add({ key: 'app', severity:'error', summary: 'Error', life: 5000, detail: msg });
  }

}
