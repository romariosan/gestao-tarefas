import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Tarefa, TarefaService } from 'src/app/core/services/tarefa.service';

@Component({
  selector: 'app-delete-tarefa',
  templateUrl: './detelar-tarefa.component.html',
  styleUrls: ['./detelar-tarefa.component.scss']
})
export class DeletarTarefaComponent {
  constructor(
    private tarefaServico: TarefaService,
    private dialogRef: MatDialogRef<DeletarTarefaComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Tarefa
  ) {}
  
  confirmar(): void {
    this.tarefaServico.deletarTarefa(this.data.id!).subscribe({
      next: () => {
        this.snackBar.open('Tarefa excluída com sucesso!', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.snackBar.open('Erro ao excluir tarefa. Tente novamente.', 'Fechar', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['error-snackbar']
        });
      }
    });
  }
  
  cancelar(): void {
    this.dialogRef.close(false);
  }
}