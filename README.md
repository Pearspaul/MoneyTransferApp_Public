# MoneyTransferApp

This App is real Money Transfer app, but will give look and feel. Currency data provided will be dummy.

Uses 3 APIs
--> AuthAPI -- for Authentication and  creation of User details
--> FxAPI -- for getting currency types and conversion rate
--> PaymentAPI -- Used for storing payment or transaction details and will update once approve by Admin

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

--> This App uses JWT Authentication for login

--> User can be created using Signup page by giving User details Role will be 'User'

--> Once login depents on 'Admin' or 'User the page will be loaded

--> For User can get the exchange rate by selecting conversion type, and amount

--> For User can do submit transaction after giving from account and to account, Once transaction submited successfully the Admin gets email notification

--> Once we login with Admin, the Admin can Approve or Decline the transaction and transaction status will get updated in Payment table.

