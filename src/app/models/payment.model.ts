export class PaymentModel{
    senderEmail!:string;
    currencyFrom!:string;
    currencyTo!:string;
    amountFrom!:number;
    amountTo!:number;
    exchangeRate!:number;
    additionalNotes!:string;
    senderAccountNumber!:number;
    receiverAccountNumber!:number;
    customerId!:number;
    adminEmail!:string;
}