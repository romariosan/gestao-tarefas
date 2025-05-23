import { NgModule ,LOCALE_ID} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDateFormats, MatNativeDateModule } from '@angular/material/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { ListarTarefaComponent } from './tarefa/listar-tarefa/listar-tarefa.component';
import { CriarTarefaComponent } from './tarefa/criar-tarefa/criar-tarefa.component';
import { EditarTarefaComponent } from './tarefa/editar-tarefa/editar-tarefa.component';
import { DeletarTarefaComponent } from './tarefa/delete-tarefa/detelar-tarefa.component';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);
const MY_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'dd/MM/yyyy',
    monthYearLabel: 'MMMM yyyy',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM yyyy',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    ListarTarefaComponent,
    CriarTarefaComponent,
    EditarTarefaComponent,
    DeletarTarefaComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
