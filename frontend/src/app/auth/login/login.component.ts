import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthRequest, AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      usuario: ['', [Validators.required]],
      senha: ['', [Validators.required]]
    });
  }
  
  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials: AuthRequest = this.loginForm.value;
      
      this.authService.login(credentials).subscribe({
        next: () => {
          this.snackBar.open('Login realizado com sucesso!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
          this.router.navigate(['/tarefa']);
        },
        error: (error) => {
          this.errorMessage = error.message;
          this.snackBar.open(error.message, 'Fechar', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['error-snackbar']
          });
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
      this.snackBar.open('Por favor, preencha todos os campos corretamente.', 'Fechar', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['error-snackbar']
      });
    }
  }
  
  irParaTelaRegistrar(): void {
    this.router.navigate(['/registrar']);
  }
}