import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthRequest, AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  registroForm: FormGroup;
  errorMessage: string = '';
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registroForm = this.fb.group({
      usuario: ['', [Validators.required]],
      senha: ['', [Validators.required, Validators.minLength(4)]]
    });
  }
  
  onSubmit(): void {
    if (this.registroForm.valid) {
      const userData: AuthRequest = this.registroForm.value;
      
      this.authService.registro(userData).subscribe({
        next: (response) => {
          this.snackBar.open('Usuário registrado com sucesso!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
          this.router.navigate(['/login']);
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
      this.registroForm.markAllAsTouched();
      this.snackBar.open('Por favor, preencha todos os campos corretamente.', 'Fechar', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['error-snackbar']
      });
    }
  }
  
  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}