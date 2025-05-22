import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Gestão de Tarefas';

  constructor(public authService: AuthService) {}

  sair(): void {
    this.authService.sair();
  }
}
