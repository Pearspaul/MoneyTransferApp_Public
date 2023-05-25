import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { FxApiService } from 'src/app/Services/fx-api.service';
import { UserStoreService } from 'src/app/Services/user-store.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Currency } from 'src/app/models/currency.model';
import { ConversionRateApi } from 'src/app/models/conversion-rate-api.model';
import ValidateForm from 'src/app/helpers/validateform';
import { PaymentApiService } from 'src/app/Services/payment-api.service';
import { PaymentStatusModel } from 'src/app/models/payment-status.model';
import { PaymentModel } from 'src/app/models/payment.model';

@Component({
  selector: 'app-foreign-exchange-contract',
  templateUrl: './foreign-exchange-contract.component.html',
  styleUrls: ['./foreign-exchange-contract.component.scss']
})
export class ForeignExchangeContractComponent implements OnInit {
  public currencies:any = [];
  public transations:any=[];
  public role!:string;
  public email!:string;
  public userId!:number;
  public adminEmail!:string;
  public toCurrency:string ="Select To Currency";
  public fromCurrency:string ="Select From Currency";
  public conversionRateApi:ConversionRateApi = new ConversionRateApi;
  public fromAmount!:number;
  public amount!:number;
  public exchangeRate!:number;
  public commission!:number;
  public transferAmount!:number;
  public currencySymbol!:string;
  contractForm!: FormGroup;
  public paymentModel:PaymentModel= new PaymentModel;
  public paymentStatusModel:PaymentStatusModel= new PaymentStatusModel;

  public fullName : string = "";
  constructor( private fb:FormBuilder,private fxApi:FxApiService,private auth: AuthService, private userStore: UserStoreService, private paymentApi: PaymentApiService) { }
  ngOnInit() {
    this.contractForm =this.fb.group({
      fromAccount:['',Validators.required],
      toAccount:['',Validators.required],
      additionalNote:'',
    })

    this.userStore.getFullNameFromStore()
    .subscribe(val=>{
      const fullNameFromToken = this.auth.getFullNameFromToken();
      this.fullName = val || fullNameFromToken
    });

    this.userStore.getRoleFromStore()
    .subscribe(val=>{
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    })

    this.userStore.getEmailFromStore()
    .subscribe(val=>{
      const emailFromToken = this.auth.getEmailFromStore();
      this.email= val || emailFromToken;
    })

    this.userStore.getUserIdFromStore()
    .subscribe(val=>{
      const userIdFromToken = this.auth.getUserIdFromStore();
      this.userId= val || userIdFromToken;
    })

    this.userStore.getAdminEmailFromStore()
    .subscribe(val=>{
      const adminEmailFromToken = this.auth.getAdminEmailFromStore();
      this.adminEmail= val || adminEmailFromToken;
    })

    if(this.role==="User")
    {
    this.fxApi.GetAllCurrencyApi()
    .subscribe(res=>{
    this.currencies = res;
    });
  }
  if(this.role==="Admin")
  {
    this.callForTransactions();
  }
  }

  logout(){
    this.auth.signout();
  }
  setToCurrency(currency: Currency){
    this.toCurrency = currency.currencyCode;
    this.conversionRateApi.toCurrencyCode = currency.currencyCode;
    this.transferAmount =0;
  }
  setFromCurrency(currency: Currency){
    this.fromCurrency = currency.currencyCode;
    this.conversionRateApi.fromCurrencyCode = currency.currencyCode;
    this.transferAmount =0;
  }
  GetRate(){
    this.conversionRateApi.fromCurrencyAmount = this.fromAmount;
    this.fxApi.CalculateConverstionApi(this.conversionRateApi)
      .subscribe({
        next:(res =>{
          this.conversionRateApi =res;
          this.amount=res.toCurrencyAmount;
          this.exchangeRate=res.exchangeRate;
          this.commission=res.commissionRate;
          this.transferAmount=res.finalTransferAmount;
          this.currencySymbol=res.toCurrencySymbol;
        }),
        error:(err=>{
          alert(err?.error.message)
        })
      })
  }
  TransferAmount(){
    if(this.contractForm.valid){
      this.paymentModel.senderAccountNumber=this.contractForm.value.fromAccount;
      this.paymentModel.receiverAccountNumber=this.contractForm.value.toAccount;
      this.paymentModel.senderEmail=this.email;
      this.paymentModel.additionalNotes=this.contractForm.value.additionalNote;
      this.paymentModel.currencyFrom=this.conversionRateApi.fromCurrencyCode;
      this.paymentModel.currencyTo=this.conversionRateApi.toCurrencyCode;
      this.paymentModel.amountFrom=this.conversionRateApi.fromCurrencyAmount;
      this.paymentModel.amountTo=this.conversionRateApi.finalTransferAmount;
      this.paymentModel.exchangeRate=this.conversionRateApi.exchangeRate;
      this.paymentModel.customerId =this.userId;
      this.paymentModel.adminEmail=this.adminEmail;
    this.paymentApi.SubmitPaymentApi(this.paymentModel)
      .subscribe({
        next:(res =>{
          this.transferAmount =0;
          alert("Successfully Submitted");
        }),
        error:(err=>{
          alert(err?.error.message)
        })
      })
    }
    else{
      ValidateForm.validateAllFormFields(this.contractForm);
    }
  }

  callForTransactions(){
    this.paymentApi.GetAllTransactionApi()
    .subscribe(res=>{
    this.transations = res;
    });
  }
  UpdateStatus(id:number,newStatus:string)
  {
    this.paymentStatusModel.paymentId=id;
    this.paymentStatusModel.newStatus=newStatus;
  this.paymentApi.UpdatePaymentApi(this.paymentStatusModel)
  .subscribe({
    next:(res =>{
      this.callForTransactions();
      alert("Successfully Submitted");
    }),
    error:(err=>{
      alert(err?.error.message)
    })
  })
  }
}
