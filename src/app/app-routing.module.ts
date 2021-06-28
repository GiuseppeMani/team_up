import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrazioneComponent } from './registrazione/registrazione.component';
import { PaginaProfiloComponent } from './pagina-profilo/pagina-profilo.component';
import { AmministratoreComponent } from './amministratore/amministratore.component';
import { ElencoUtentiComponent } from './elenco-utenti/elenco-utenti.component';
import { PaginaNonTrovataComponent } from './pagina-non-trovata/pagina-non-trovata.component';


const routes: Routes = [
  { path: "home", component: HomeComponent }, 
  { path: "", redirectTo: "/login", pathMatch: "full" }, 
  { path: "login", component: LoginComponent },
  { path: "Pro342", component: AmministratoreComponent },
  { path: "registrazione", component: RegistrazioneComponent },
  { path: "pagina-profilo", component: PaginaProfiloComponent },
  { path: "elenco-teamMates", component: ElencoUtentiComponent },
  { path: "**", component: PaginaNonTrovataComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent,
                                  LoginComponent,
                                  AmministratoreComponent,
                                  RegistrazioneComponent,
                                  ElencoUtentiComponent,
                                  PaginaProfiloComponent];