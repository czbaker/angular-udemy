import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {

  // Props
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  // DI
  constructor(private authService: AuthService) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return; // Check to make sure it's valid form data (validation)
    
    // Grab Values
    const email = form.value.email;
    const password = form.value.password;
    
    // Auth Observable
    let authObs: Observable<AuthResponseData>

    // We're Loading (sending req)
    this.isLoading = true;

    // Process Submission based on mode
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    // Subscribe to Observable returned by login/signup requests:
    authObs.subscribe((response) => {
      this.isLoading = false;
      console.log(response);
    },
    (err) => {
      this.error = err;
      this.isLoading = false;
    });
    
  }

}
