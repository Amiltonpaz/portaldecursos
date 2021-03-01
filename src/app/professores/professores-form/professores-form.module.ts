import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfessoresComponent } from '../professores.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViaCepService } from 'src/app/services/via-cep.service';
import { DbService } from 'src/app/services/db.service';
import { ProfCadastroComponent } from '../prof-cadastro/prof-cadastro.component';



@NgModule({
  declarations: [ProfessoresComponent],
  imports: [
    CommonModule, FormsModule,
    ReactiveFormsModule
  ],
  providers: [ViaCepService,DbService]
})
export class ProfessoresFormModule { }
