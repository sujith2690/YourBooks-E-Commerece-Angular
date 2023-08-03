import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private fb: FormBuilder, private router: Router) { }

  // Login schema
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });
  get f() {
    return this.loginForm.controls
  }
  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      console.log(formData);
      sessionStorage.setItem('userData', JSON.stringify(formData));
      this.loginForm.reset();
      this.router.navigate(['']);
    } else {
      this.markAllFieldsAsTouched();
    }
  }
  // Helper function to mark all form fields as touched
  private markAllFieldsAsTouched() {
    Object.keys(this.loginForm.controls).forEach(field => {
      const control = this.loginForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

}
