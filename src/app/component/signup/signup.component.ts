import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import ValidateForm from 'src/app/helpers/validateform';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  type:string="password";
  isText: boolean=false;
  eyeIcon:string="fa-eye-slash";
  signUpForm!: FormGroup;
  constructor(private fb:FormBuilder, private auth: AuthService, private router: Router){}

  ngOnInit(): void {
    this.signUpForm =this.fb.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',Validators.required],
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
  onSignUp(){
    if(this.signUpForm.valid){
      console.log(this.signUpForm.value)
      this.auth.signUp(this.signUpForm.value)
      .subscribe({
        next:(res =>{
          alert(res.message);
          this.signUpForm.reset();
          this.router.navigate(['login'])
        }),
        error:(err=>{
          alert(err?.error.message)
        })
      })
      //send data to database
    }
    else{
      console.log("Form is not valid")
      ValidateForm.validateAllFormFields(this.signUpForm);
      alert("your form is valid");
      // throw the error using toaster message
    }
  }
}
