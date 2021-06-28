import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrazioneComponent } from './registrazione/registrazione.component';
import { PaginaProfiloComponent } from './pagina-profilo/pagina-profilo.component';
import { PaginaNonTrovataComponent } from './pagina-non-trovata/pagina-non-trovata.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AmministratoreComponent } from './amministratore/amministratore.component';
import { RiepilogoProgettoComponent } from './riepilogo-progetto/riepilogo-progetto.component';
import { ProgettoComponent } from './progetto/progetto.component';
import { ProgettiTeamMateComponent } from './progetti-team-mate/progetti-team-mate.component';
import { ElencoUtentiComponent } from './elenco-utenti/elenco-utenti.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    LoginComponent,
    RegistrazioneComponent,
    PaginaProfiloComponent,
    PaginaNonTrovataComponent,
    HomeComponent,
    NavbarComponent,
    AmministratoreComponent,
    RiepilogoProgettoComponent,
    ProgettoComponent,
    ProgettiTeamMateComponent,
    ElencoUtentiComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule
  ],
  entryComponents: [
    LoginComponent,
    HomeComponent,
    RegistrazioneComponent
  ],

  providers: [],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
