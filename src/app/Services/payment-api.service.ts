import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentStatusModel } from '../models/payment-status.model';
import { PaymentModel } from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentApiService {

  private baseUrl:string="https://localhost:7171/api/Payment/";

  constructor(private http:HttpClient) { }

  SubmitPaymentApi(paymentModel :PaymentModel){
    return this.http.post<any>(`${this.baseUrl}submitPayment`,paymentModel)
  }
  GetAllTransactionApi(){
    return this.http.get<any>(`${this.baseUrl}getTransactions`)
  }
  UpdatePaymentApi(paymentStatusModel :PaymentStatusModel){
    return this.http.put<any>(`${this.baseUrl}updatePayment`,paymentStatusModel)
  }
}
