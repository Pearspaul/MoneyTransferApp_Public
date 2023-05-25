import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { UserStoreService } from 'src/app/Services/user-store.service';
import ValidateForm from 'src/app/helpers/validateform';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  type:string="password";
  isText: boolean=false;
  eyeIcon:string="fa-eye-slash";
  loginForm!: FormGroup;
  public isValidEmail! : boolean; 
  constructor(
    private fb:FormBuilder,
    private auth:AuthService,
    private router: Router,
    private userStore: UserStoreService){}
  ngOnInit(): void {
    this.loginForm =this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })  
  }
  hideShowPass()
  {
    this.isText = !this.isText;
    this.type = this.isText? "text":"password";
    this.isText? this.eyeIcon="fa-eye-slash": this.eyeIcon="fa-eye";
  }
  onLogin(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value)
      this.auth.login(this.loginForm.value).subscribe({
        next:(res)=>{
          console.log(res.message);
          this.loginForm.reset();
          this.auth.storeToken(res.accessToken);
          this.auth.storeRefreshToken(res.refreshToken)
          const tokenPayload= this.auth.decodeTheToken();
          this.userStore.setFullNameForStore(tokenPayload.fullName);
          this.userStore.setRoleForStore(tokenPayload.role);
          console.log("Success");
          this.router.navigate(['contract']);
        },
        error:(err)=>{
          console.log(err);
          alert("Something went wrong!");
        }
      })
      //send data to database
    }
    else{
      ValidateForm.validateAllFormFields(this.loginForm);
      // throw the error using toaster message
    }
  }
  checkValidEmail(event: string)
  {
    const value = event;
    const pattern =/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    this.isValidEmail= pattern.test(value);
    return this.isValidEmail;
  }
}
