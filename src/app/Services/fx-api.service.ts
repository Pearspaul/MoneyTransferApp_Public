import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConversionRateApi } from '../models/conversion-rate-api.model';

@Injectable({
  providedIn: 'root'
})
export class FxApiService {

  private baseUrl:string="https://localhost:7028/api/Currency/";

  constructor(private http:HttpClient) { }

  GetAllCurrencyApi(){
    return this.http.get<any>(this.baseUrl);
  }
  CalculateConverstionApi(conversionRateApi :ConversionRateApi){
    return this.http.post<any>(`${this.baseUrl}calculateConverstion`,conversionRateApi)
  }
}
