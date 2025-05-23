import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Tarefa, TarefaService } from 'src/app/core/services/tarefa.service';

@Component({
  selector: 'app-tarefa-criar',
  templateUrl: './criar-tarefa.component.html',
  styleUrls: ['./criar-tarefa.component.scss']
})
export class CriarTarefaComponent {
  tarefaForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private tarefaService: TarefaService,
    private dialogRef: MatDialogRef<CriarTarefaComponent>,
    private snackBar: MatSnackBar
  ) {
    this.tarefaForm = this.fb.group({
      status: ['', Validators.required],
      prioridade: ['', Validators.required],
      data: ['', Validators.required]
    });
  }
  
  onSubmit(): void {
    if (this.tarefaForm.valid) {
      const taredaDados: Tarefa = {
        ...this.tarefaForm.value,
        data: this.formatDate(this.tarefaForm.value.data)
      };
      
      this.tarefaService.criarTarefa(taredaDados).subscribe({
        next: (response) => {
          this.snackBar.open('Tarefa criada com sucesso!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
          this.dialogRef.close(true);
        },
        error: (error) => {
          this.snackBar.open('Erro ao criar tarefa. Tente novamente.', 'Fechar', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['error-snackbar']
          });
        }
      });
    } else {
      this.tarefaForm.markAllAsTouched();
      this.snackBar.open('Por favor, preencha todos os campos obrigatórios.', 'Fechar', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['error-snackbar']
      });
    }
  }
  
  cancelar(): void {
    this.dialogRef.close(false);
  }
  
  private formatDate(date: Date): string {
    if (!date) return '';
    
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    
    return `${year}-${month}-${day}`;
  }
}