import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { ICurrency } from '../types/currency'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {

  constructor(private http: HttpClient) {
  }

  getAllCurrencies(): Observable<ICurrency[]>  {

    return this.http.get<ICurrency[]>('https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5')
  }
}
