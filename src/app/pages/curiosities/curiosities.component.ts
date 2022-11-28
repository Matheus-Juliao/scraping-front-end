import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PagesService } from '../pages.service';

@Component({
  selector: 'app-curiosities',
  templateUrl: './curiosities.component.html',
  styleUrls: ['./curiosities.component.scss']
})
export class CuriositiesComponent implements OnInit {
  public response: any
  public results: any
  
  public showTable: boolean = false
  public showLoanding: boolean = false

  public msg: string = ""

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

  constructor(private pagesService: PagesService, 
    private messageService: MessageService) { 
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
  }

  private showError(msg: string) {
    this.messageService.add({ key: 'app', severity:'error', summary: 'Error', life: 5000, detail: msg });
  }

}
