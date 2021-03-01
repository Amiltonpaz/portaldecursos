
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
import { NgxParallaxScrollModule } from 'ngx-parallax-scroll';
import { CadastroDeCursoComponent } from './cursos/cadastro-de-curso/cadastro-de-curso.component';
import { CadastroDeAlunosComponent } from './alunos/cadastro-de-alunos/cadastro-de-alunos.component';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { ProfCadastroComponent } from './professores/prof-cadastro/prof-cadastro.component';
import { ServiceWorkerModule, SwPush, SwUpdate } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuSidebarComponent } from './menu-sidebar/menu-sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { CadastroUsuariosComponent } from './login/cadastro-usuarios/cadastro-usuarios.component';



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
      CadastroUsuariosComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxParallaxScrollModule,
    FormsModule, NgxMaskModule.forRoot(),
    ReactiveFormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    HttpClientJsonpModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })


  ],

  providers: [DropdownService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(update: SwUpdate, push: SwPush, snackbar: MatSnackBar) {

   /* update.available.subscribe(update =>

    console.log('Atualização disponível!'));
    const snack = snackbar.open('Atualização disponível!', 'Reload');

    snack.onAction().subscribe(() => {
      window.location.reload();
    });

    push.messages.subscribe((msg) => {
      console.log(msg);
      snackbar.open(JSON.stringify(msg));
    });
    const key = 'BMD3qmN30HqE3vdtYsAjfrlRy8va--RdSgeGLx5gh65oaZyGtDFAD42fg9qJU3ogsfOIs7jSe5jQjsBvFmRZ_7s';
    push.requestSubscription({serverPublicKey : key})
    .then(pushSubscription => {
      console.log(pushSubscription.toJSON());
    });

*/
  }
}

