import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';
import { ValueService } from '../value.service';
import { AngularFirestore } from '@angular/fire/firestore';

class utente {

  public nome;
  public cognome;
  public num_telefono;
  public citta;
  public idTeamMate;

  constructor(@Inject(String) nome, @Inject(String) cognome, @Inject(String) citta, @Inject(String) num_telefono, @Inject(String) idTeamMate) {

    this.nome = nome;
    this.cognome = cognome;
    this.num_telefono = citta;
    this.citta = num_telefono;
    this.idTeamMate = idTeamMate;

  }

}

@Component({
  selector: 'app-elenco-utenti',
  templateUrl: './elenco-utenti.component.html',
  styleUrls: ['./elenco-utenti.component.scss']
})
export class ElencoUtentiComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, public router: Router, public firestore: AngularFirestore, private valueservice: ValueService) {
    this.AcquisizioneUtenti();
  }

  public utenti: utente[];

  ngOnInit(): void {
  }

  AcquisizioneUtenti() {
    
      this.firestore.collection("teamMate").get().forEach((users) => {
        users.forEach((user) => {
          
          if (this.utenti != undefined) {
            this.utenti.push(new utente(user.data().nome, user.data().cognome, user.data().numero_telefono, user.data().citta, user.id));
          }
          else {
            this.utenti = [new utente(user.data().nome, user.data().cognome, user.data().numero_telefono, user.data().citta, user.id)];
          }

        });
      });
  }

  eliminaTeamMate(idTeamMate) {
    this.firestore.collection("teamMate").doc(idTeamMate).delete();
    this.firestore.collection("Progetto").ref.where("teamLeader","==",idTeamMate).get().then((docs) => {
      docs.forEach(doc => {
        this.firestore.collection("Progetto").doc(doc.id).update({
          stato:"chiuso"
           });
      })})

      this.router.navigateByUrl('/', ).then(() => {
        this.router.navigate(["/elenco-teamMates"]); // navigate to same route
      });
  }
}
