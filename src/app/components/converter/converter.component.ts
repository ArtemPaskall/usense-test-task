import { Component, OnInit } from '@angular/core'
import { CurrenciesService } from '../../services/currencies.service'
import { ICurrency } from '../../types/currency'

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {
  currencies: ICurrency[] = []
  fromCurrency: ICurrency | null = null
  toCurrency: ICurrency | null = null
  fromAmount: number = 1
  toAmount: number = 0

  initHryvnaValues =   {
    "ccy": "UAH",
    "base_ccy": "UAH",
    "buy": "1.00000",
    "sale": "1.00000"
  }

  constructor(private currenciesService: CurrenciesService) {}

  ngOnInit(): void {
    this.currenciesService.getAllCurrencies().subscribe((data: ICurrency[]) => {
      this.currencies = data;

      if (!this.currencies.find(c => c.ccy === 'UAH')) {
        this.currencies.push(this.initHryvnaValues);
      }

      this.fromCurrency = this.currencies.find(c => c.ccy === 'EUR') || null
      this.toCurrency = this.currencies.find(c => c.ccy === 'USD') || null

      this.convertFromAmount()
    })
  }

  roundToTwoDecimals(amount: number): number {
    return Math.round(amount * 100) / 100
  }


  convertFromAmount(): void {
    if (this.fromCurrency && this.toCurrency) {
      if (this.fromCurrency.ccy === 'UAH') {
        this.toAmount = this.roundToTwoDecimals(this.fromAmount / parseFloat(this.toCurrency.sale))
      } else if (this.toCurrency.ccy === 'UAH') {
        this.toAmount = this.roundToTwoDecimals(this.fromAmount * parseFloat(this.fromCurrency.buy))
      } else {
        this.toAmount = this.roundToTwoDecimals((this.fromAmount * parseFloat(this.fromCurrency.buy)) / parseFloat(this.toCurrency.sale))
      }
    }
  }


  convertToAmount(): void {
    if (this.fromCurrency && this.toCurrency) {
      if (this.fromCurrency.ccy === 'UAH') {
        this.fromAmount = this.roundToTwoDecimals(this.toAmount * parseFloat(this.toCurrency.sale))
      } else if (this.toCurrency.ccy === 'UAH') {
        this.fromAmount = this.roundToTwoDecimals(this.toAmount / parseFloat(this.fromCurrency.buy))
      } else {
        this.fromAmount = this.roundToTwoDecimals((this.toAmount * parseFloat(this.toCurrency.sale)) / parseFloat(this.fromCurrency.buy))
      }
    }
  }


  onFromAmountChange(): void {
    this.convertFromAmount()
  }

  onToAmountChange(): void {
    this.convertToAmount()
  }

  onFromCurrencyChange(): void {
    this.convertFromAmount()
  }

  onToCurrencyChange(): void {
    this.convertFromAmount()
  }
}
