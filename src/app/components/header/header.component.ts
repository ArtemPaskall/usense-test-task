import { Component, Input, OnInit } from '@angular/core'
import { ICurrency } from '../../types/currency'
import { CurrenciesService } from '../../services/currencies.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  loading = false
  currencies: ICurrency[] = []

  constructor (
    public currenciesService: CurrenciesService
  ) { }

  ngOnInit(): void {
    this.loading = true

    this.currenciesService.getAllCurrencies().subscribe((data: ICurrency[]) => {
      this.currencies = data;
      this.loading = false
    })
  }
}
