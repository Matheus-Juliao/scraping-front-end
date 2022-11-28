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
  
  public showTable: boolean = true
  public showLoanding: boolean = false

  public msg: string = ""

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
        console.log(this.response)
        this.showTable = true
        this.showLoanding = false
      }
    })
  }

  public cheapest() {

  }

  public back() {

  }

  private showError(msg: string) {
    this.messageService.add({ key: 'app', severity:'error', summary: 'Error', life: 5000, detail: msg });
  }

}
