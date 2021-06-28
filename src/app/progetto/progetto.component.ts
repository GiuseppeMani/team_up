import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-progetto',
  templateUrl: './progetto.component.html',
  styleUrls: ['./progetto.component.scss']
})
export class ProgettoComponent implements OnInit {

  public progetto = {nome: "", descrizione: "", genere: "", num_partecipanti: "", teamLeader: "", data_pubblicazione: null, num_teamMate: 0, stato: "aperto", idPartecipanti: [] };

  constructor(public firestore: AngularFirestore, public afAuth: AngularFireAuth, public router: Router) {

  }

  ngOnInit(): void {}

  /* AGGIUNGI PROGETTO */

  addProgetto() {

    this.afAuth.authState.subscribe(user => {
      this.progetto.teamLeader = user.uid;
      this.progetto.data_pubblicazione = new Date();
      this.firestore.collection("Progetto").add({

        ...this.progetto
  
      })

      .then(() => {window.location.reload();})

    })


  }

  /* TORNA INDIETRO */

  tornaIndietro() {

    window.location.reload()

  }

}
