import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Tarefa, TarefaPagina, TarefaService } from 'src/app/core/services/tarefa.service';
import { CriarTarefaComponent } from '../criar-tarefa/criar-tarefa.component';
import { EditarTarefaComponent } from '../editar-tarefa/editar-tarefa.component';
import { DeletarTarefaComponent } from '../delete-tarefa/detelar-tarefa.component';

@Component({
  selector: 'app-tarefa-listar',
  templateUrl: './listar-tarefa.component.html',
  styleUrls: ['./listar-tarefa.component.scss']
})
export class ListarTarefaComponent implements OnInit {
  tarefas: Tarefa[] = [];
  totalItems = 0;
  pageSize = 10;
  currentPage = 0;
  filtroForm: FormGroup;
  displayedColumns: string[] = ['status', 'prioridade', 'data', 'actions'];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(
    private tarefaServico: TarefaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.filtroForm = this.fb.group({
      status: [''],
      prioridade: [''],
      data: ['']
    });
  }
  
  ngOnInit(): void {
    this.carregarTarefas();
  }
  
  carregarTarefas(): void {
    const filters = this.filtroForm.value;
    
    this.tarefaServico.obterTarefas(
      filters.status || undefined,
      filters.prioridade || undefined,
      filters.data ? this.formatDate(filters.data) : undefined,
      this.currentPage,
      this.pageSize
    ).subscribe({
      next: (page: TarefaPagina) => {
        this.tarefas = page.content;
        this.totalItems = page.totalElements;
      },
      error: (error) => {
        this.snackBar.open('Erro ao carregar tarefas. Tente novamente.', 'Fechar', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['error-snackbar']
        });
      }
    });
  }
  
  eventoPagina(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.carregarTarefas();
  }
  
  pesquisar(): void {
    this.currentPage = 0;
    if (this.paginator) {
      this.paginator.firstPage();
    }
    this.carregarTarefas();
  }
  
  limparCampos(): void {
    this.filtroForm.reset({
      status: '',
      prioridade: '',
      data: ''
    });
    this.currentPage = 0;
    if (this.paginator) {
      this.paginator.firstPage();
    }
    this.carregarTarefas();
  }
  
  modalCriarTarefaDialog(): void {
    const dialogRef = this.dialog.open(CriarTarefaComponent, {
      width: '500px'
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.carregarTarefas();
      }
    });
  }
  
  modalEditarTarefaDialog(tarefa: Tarefa): void {
    const dialogRef = this.dialog.open(EditarTarefaComponent, {
      width: '500px',
      data: { ...tarefa }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.carregarTarefas();
      }
    });
  }
  
  deletarTarefaDialog(tarefa: Tarefa): void {
    const dialogRef = this.dialog.open(DeletarTarefaComponent, {
      width: '400px',
      data: tarefa
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.carregarTarefas();
      }
    });
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