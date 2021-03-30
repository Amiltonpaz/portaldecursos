

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DropdownService } from './services/dropdown.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlunosComponent } from './alunos/alunos.component';
import { CursosComponent } from './cursos/cursos.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { CadastroDeCursoComponent } from './cursos/cadastro-de-curso/cadastro-de-curso.component';
import { CadastroDeAlunosComponent } from './alunos/cadastro-de-alunos/cadastro-de-alunos.component';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { ProfCadastroComponent } from './professores/prof-cadastro/prof-cadastro.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MenuSidebarComponent } from './menu-sidebar/menu-sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { CadastroUsuariosComponent } from './login/cadastro-usuarios/cadastro-usuarios.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { NoticiasComponent } from './noticias/noticias.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RatingModule } from 'ngx-bootstrap/rating';
import { ModalCursoComponent } from './cursos/modal-curso/modal-curso.component';
import { CommonModule } from '@angular/common';
import { NgbRatingComponent } from './ngb-rating/ngb-rating.component';


@NgModule({
  declarations: [
    AppComponent,
    AlunosComponent,
    CursosComponent,
    HomeComponent,
    LoginComponent,
    CadastroDeCursoComponent,
    CadastroDeAlunosComponent,
    ProfCadastroComponent,
    MenuSidebarComponent,
    FooterComponent,
    CadastroUsuariosComponent,
    NoticiasComponent,
    ModalCursoComponent,
    NgbRatingComponent
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, NgxMaskModule.forRoot(),
    ReactiveFormsModule,
    HttpClientJsonpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    NgbModule,
    ModalModule,
    RatingModule,
    CommonModule,
    AlertModule,
    BsDropdownModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })

  ],

  providers: [DropdownService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
}

