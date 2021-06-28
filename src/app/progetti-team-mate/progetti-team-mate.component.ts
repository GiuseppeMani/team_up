import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase';


class progetto {

  public nome;
  public genere;
  public num_partecipanti;
  public descrizione;
  public teamLeader;
  public data_pubblicazione;
  public num_teamMate;
  public id_descrizione = "idDes";
  public id_riepilogo = "idRie";
  public id_candidatura = "idCan";
  public idProgetto;
  public dataProgetto;
  public stato;
  public riepilogo;

  constructor(@Inject(String) nome, @Inject(String) genere, @Inject(String) num_partecipanti, @Inject(String) descrizione, @Inject(String) teamLeader, @Inject(Object) data_pubblicazione, @Inject(Boolean) num_teamMate, @Inject(Boolean) stato, @Inject(String) idProgetto, @Inject(String) riepilogo) {
    this.nome = nome;
    this.genere = genere;
    this.num_partecipanti = num_partecipanti;
    this.descrizione = descrizione;
    this.teamLeader = teamLeader;
    this.data_pubblicazione = new Date(data_pubblicazione.seconds * 1000);
    this.num_teamMate = num_teamMate;
    this.stato = stato;
    this.idProgetto = idProgetto;
    this.id_descrizione += this.idProgetto;
    this.id_riepilogo += this.idProgetto;
    this.id_candidatura += this.idProgetto;
    this.dataProgetto = this.data_pubblicazione.getDate() + "/" + (this.data_pubblicazione.getMonth() + 1) + "/" + this.data_pubblicazione.getFullYear();
    this.riepilogo = riepilogo;

  }

}

@Component({
  selector: 'app-progetti-team-mate',
  templateUrl: './progetti-team-mate.component.html',
  styleUrls: ['./progetti-team-mate.component.scss']
})

export class ProgettiTeamMateComponent implements OnInit {
  public progetti: progetto[];
  tab: string;
  public riepilogo = { AvanzamentoProgetto: "", data: new Date() };
  public progetto = { idListaAttesa: [], idPartecipanti: [], num_teamMate: 0, riepilogo: this.riepilogo.AvanzamentoProgetto };

  public dataRiepilogo = this.riepilogo.data.getDate() + "/" + (this.riepilogo.data.getMonth() + 1) + "/" + this.riepilogo.data.getFullYear()

  constructor(public firestore: AngularFirestore, public afAuth: AngularFireAuth, public router: Router) {
    this.getProgetti();
    this.tab = "idDes";
   }

  ngOnInit(): void {
  }

  getProgetti() {
    this.afAuth.authState.subscribe(async (user) => {
      this.firestore.collection("Progetto").ref.where("idPartecipanti", "array-contains", user.uid).get().then((docs) => {
        docs.forEach(doc => {
          console.log(doc.data());
          if (this.progetti === undefined) {
            this.tab += doc.id;
            this.progetti = [new progetto(doc.data().nome, doc.data().genere, doc.data().num_partecipanti, doc.data().descrizione, doc.data().teamLeader, doc.data().data_pubblicazione, doc.data().num_teamMate, doc.data().stato, doc.id, doc.data().riepilogo)]
          }
          else {
            this.progetti.push(new progetto(doc.data().nome, doc.data().genere, doc.data().num_partecipanti, doc.data().descrizione, doc.data().teamLeader, doc.data().data_pubblicazione, doc.data().num_teamMate, doc.data().stato, doc.id, doc.data().riepilogo))
          }
        })
      })
    })
  }

  changeTabToDes(idProgetto) {
    this.tab = "idDes";
    this.tab += idProgetto;
  }

  changeTabToRiep(idProgetto) {
    this.tab = "idRie";
    this.tab += idProgetto;
    this.firestore.collection("Progetto").doc(idProgetto).get().forEach(proj => {
      if (proj.data().riepilogo !== undefined) {
        this.riepilogo.AvanzamentoProgetto = proj.data().riepilogo
      }
    })
  }

  changeTabToCand(idProgetto) {
    this.tab = "idCan";
    this.tab += idProgetto;
  }


}
