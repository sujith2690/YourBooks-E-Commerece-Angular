import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private fb: FormBuilder,private router: Router) { }

  // SignUp schema
  registrationForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(3)]],
  });
  get f(){
    return this.registrationForm.controls
  }
  onSubmit() {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;
      console.log(formData)
      // localStorage.setItem('userData', JSON.stringify(formData));
      sessionStorage.setItem('userData', JSON.stringify(formData)); // Use sessionStorage instead of localStorage
      this.registrationForm.reset();
      this.router.navigate(['']);
    } else {
      this.markAllFieldsAsTouched();
    }
  }

  // Helper function to mark all form fields as touched
  private markAllFieldsAsTouched() {
    Object.keys(this.registrationForm.controls).forEach(field => {
      const control = this.registrationForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }
}
