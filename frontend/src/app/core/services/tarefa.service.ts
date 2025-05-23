import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Tarefa {
  id?: number;
  status: string;
  prioridade: string;
  data: string;
}

export interface TarefaPagina {
  content: Tarefa[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  private readonly API_URL = 'http://localhost:8080/api/tarefas';

  constructor(private http: HttpClient) {}

  obterTarefas(
    status?: string,
    prioridade?: string,
    data?: string,
    page: number = 0,
    size: number = 10
  ): Observable<TarefaPagina> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (status) {
      params = params.set('status', status);
    }
    
    if (prioridade) {
      params = params.set('prioridade', prioridade);
    }
    
    if (data) {
      params = params.set('data', data);
    }

    return this.http.get<TarefaPagina>(this.API_URL, { params });
  }

  obterPorId(id: number): Observable<Tarefa> {
    return this.http.get<Tarefa>(`${this.API_URL}/${id}`);
  }

  criarTarefa(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.post<Tarefa>(this.API_URL, tarefa);
  }

  atualizarTarefa(id: number, tarefa: Tarefa): Observable<Tarefa> {
    return this.http.put<Tarefa>(`${this.API_URL}/${id}`, tarefa);
  }

  deletarTarefa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}