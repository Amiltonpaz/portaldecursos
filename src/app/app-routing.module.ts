import { NoticiasComponent } from './noticias/noticias.component';
import { CadastroUsuariosComponent } from './login/cadastro-usuarios/cadastro-usuarios.component';
import { Professor } from './professores/professor-model';
import { ProfCadastroComponent } from './professores/prof-cadastro/prof-cadastro.component';
import { CursosComponent } from './cursos/cursos.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlunosComponent } from './alunos/alunos.component';
import { CadastroDeAlunosComponent } from './alunos/cadastro-de-alunos/cadastro-de-alunos.component';
import { CadastroDeCursoComponent } from './cursos/cadastro-de-curso/cadastro-de-curso.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './guards/auth-guard.service';

const routes: Routes = [
  {path: '#home', component: HomeComponent, data: {animation: 'Home'}},
  {path: '#login', component: LoginComponent, data: {animation: 'Login'},
      children: [
        {path: 'cadastro-usuarios', component: CadastroUsuariosComponent}
      ]},
  {path: '#alunos', component: AlunosComponent},
  {path: '#professores', component: Professor},

  {path: '#cadastro-de-professores', component: ProfCadastroComponent, data: {animation: 'CadastroProf'}},
  {path: '#cadastro-de-cursos', component: CadastroDeCursoComponent, data: {animation: 'CadastroCursos'}},
  {path: '#cadastro-de-alunos', component: CadastroDeAlunosComponent, data: {animation: 'CadastroAlunos'}},
  {path: '#news', component: NoticiasComponent},
  {path: '', component: LoginComponent},
  {path: '**', redirectTo: '#home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
