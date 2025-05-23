import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Tarefa, TarefaService } from 'src/app/core/services/tarefa.service';

@Component({
  selector: 'app-tarefa-editar',
  templateUrl: './editar-tarefa.component.html',
  styleUrls: ['./editar-tarefa.component.scss']
})
export class EditarTarefaComponent {
  tarefaForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private tarefaService: TarefaService,
    private dialogRef: MatDialogRef<EditarTarefaComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Tarefa
  ) {
    this.tarefaForm = this.fb.group({
      status: [data.status, Validators.required],
      prioridade: [data.prioridade, Validators.required],
      data: [this.parseDate(data.data), Validators.required]
    });
  }
  
  onSubmit(): void {
    if (this.tarefaForm.valid) {
      const tarefaDados: Tarefa = {
        ...this.tarefaForm.value,
        status: this.tarefaForm.value.status?.toLowerCase(),
        prioridade: this.tarefaForm.value.prioridade?.toLowerCase(),
        data: this.formatDate(this.tarefaForm.value.data)
      };
      
      this.tarefaService.atualizarTarefa(this.data.id!, tarefaDados).subscribe({
        next: (response) => {
          this.snackBar.open('Tarefa atualizada com sucesso!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
          this.dialogRef.close(true);
        },
        error: (error) => {
          this.snackBar.open('Erro ao atualizar tarefa. Tente novamente.', 'Fechar', {
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
  
  private parseDate(dateStr: string): Date | null {
    if (!dateStr) return null;
  
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
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