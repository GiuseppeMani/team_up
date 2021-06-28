import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-pagina-profilo',
  templateUrl: './pagina-profilo.component.html',
  styleUrls: ['./pagina-profilo.component.scss']
})
export class PaginaProfiloComponent implements OnInit {

  public teamMate = { citta: "", cognome: "", nome: "", numero_telefono: "", descrizione: "" };
  public email = "";
  public password = "";
  public credenziali = firebase.auth.EmailAuthProvider.credential(this.email, this.password);

  public isDisabled = true;
  public tastoModifica = "Modifica";

  public aggProgetto = true;


  constructor(public firestore: AngularFirestore, public afAuth: AngularFireAuth, public router: Router) {

    this.afAuth.authState.subscribe((user) => {
      if (user === null)
        this.router.navigate(['/login']);
    });

    this.acquisizioneProfilo().then(() => { console.log(this.teamMate) });

  }

  ngOnInit() { }

  async acquisizioneProfilo() {

    await this.afAuth.authState.subscribe((user) => {
      this.email = user.email;
      this.firestore.collection("teamMate").doc(user.uid).get().forEach((user) => {
        this.teamMate.nome = user.data().nome;
        this.teamMate.cognome = user.data().cognome;
        this.teamMate.citta = user.data().citta;
        this.teamMate.numero_telefono = user.data().numero_telefono;
        this.teamMate.descrizione = user.data().descrizione;
      });
    });

  }

  /* MODIFICA VALORI */

  async modificaValori() {

    await this.afAuth.authState.subscribe((user) => {

      this.firestore.collection("teamMate").doc(user.uid).set({
        ...this.teamMate
      });

    });

  }

  /* MODIFICA EMAIL */

  async modificaEmail() {

    (await this.afAuth.currentUser).updateEmail(this.email);

    (await this.afAuth.currentUser).reauthenticateWithCredential(this.credenziali).then(function () {
      // User re-authenticated.
    }).catch(function (error) {
      // An error happened.
    });

  }

  /* MODIFICA PROFILO */

  modificaProfilo() {
    console.log("QUI")
    if (this.isDisabled === true) {
      this.isDisabled = false;
      this.tastoModifica = "Salva";
    }
    else {
      this.isDisabled = true;
      this.modificaValori(),
        this.modificaEmail(),
        this.tastoModifica = "Modifica";
    }
  }

  /* MODIFICA PASSWORD */

  async modificaPassword() {

    this.afAuth.sendPasswordResetEmail(this.email).then(function () {

    }).catch(function (error) {

    });

    (await this.afAuth.currentUser).reauthenticateWithCredential(this.credenziali).then(function () {
      // Utente autenticato
    }).catch(function (error) {
      // Errore
    });

  }

  /* AGGIUNGI PROGETTO */

  statoProgetto() {

    if(this.aggProgetto == true) {

      this.aggProgetto = false;

    } else {

      this.aggProgetto = true;

    }

  }


}
