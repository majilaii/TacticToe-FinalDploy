import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = this.fb.group({
    userEmail: ['', [Validators.required, Validators.email]], // TODO:  validate
    userFirstName: ['', Validators.required],
    userLastName: ['', Validators.required],
    userPassword: ['', [Validators.required, Validators.minLength(5)]]
  })

  onSubmit() {
    console.warn(this.registerForm.value);
    const { userEmail, userFirstName, userLastName, userPassword } = this.registerForm.value;
    this.authService.register(userEmail as string, userFirstName as string, userLastName as string, userPassword as string)
      .subscribe((response : any ) => { // TODO: fix typing
        console.log('response', response);
        this.router.navigate(['login'])
      })
  }

  constructor(private fb : FormBuilder, private authService : AuthService, private router: Router) { }

  ngOnInit(): void {
  }

}
