import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ListarTarefaComponent } from './tarefa/listar-tarefa/listar-tarefa.component';
import { CriarTarefaComponent } from './tarefa/criar-tarefa/criar-tarefa.component';
import { RegistroComponent } from './auth/registro/registro.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registrar', component: RegistroComponent },
  { path: 'listar', component: ListarTarefaComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/listar', pathMatch: 'full' },
  { path: '**', redirectTo: '/listar' }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }