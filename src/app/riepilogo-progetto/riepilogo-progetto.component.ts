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

class partecipante {

  public nome;
  public cognome;
  public idPartencipante;

  constructor(@Inject(String) nome, @Inject(String) cognome, @Inject(String) idPartencipante) {

    this.nome = nome;
    this.cognome = cognome;
    this.idPartencipante = idPartencipante;

    console.log(this.nome);
    console.log(this.cognome);
  }

}

@Component({
  selector: 'app-riepilogo-progetto',
  templateUrl: './riepilogo-progetto.component.html',
  styleUrls: ['./riepilogo-progetto.component.scss']
})
export class RiepilogoProgettoComponent implements OnInit {

  public riepilogo = {AvanzamentoProgetto: "", data: new Date() };

  public progetti: progetto[];

  public progetto = { idListaAttesa: [], idPartecipanti: [], num_teamMate: 0, riepilogo: this.riepilogo.AvanzamentoProgetto };

  public partecipanti: partecipante[];
  public accettazione;

  public nome;
  public cognome;

  tab: string;
  public conferma = false;

  public isDisabled = true;
  public tastoModifica = "Modifica";


  public dataRiepilogo = this.riepilogo.data.getDate() + "/" + (this.riepilogo.data.getMonth() + 1) + "/" + this.riepilogo.data.getFullYear()


  constructor(public firestore: AngularFirestore, public afAuth: AngularFireAuth, public router: Router) {
    this.getProgetti();
    this.tab = "idDes";
  }

  ngOnInit(): void { }

  getProgetti() {
    this.afAuth.authState.subscribe(async (user) => {
      await this.firestore.collection("Progetto").ref.where("teamLeader", "==", user.uid).get().then((docs) => {
        docs.forEach(doc => {
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

  modificaValori(idProgetto) {

    this.firestore.collection("Progetto").doc(idProgetto).update({
      riepilogo: this.riepilogo.AvanzamentoProgetto
    })

  }

  chiudiProgetto(idProgetto) {
    this.firestore.collection("Progetto").doc(idProgetto).update({
      stato: "chiuso",
      idListaAttesa: null
    });
    this.conferma = true;

    if (window.confirm("La pagina si aggiornerà per visualizzare la modifica dello stato!!")) {
      window.location.reload();

    }
  }

  changeTabToDes(idProgetto) {
    this.tab = "idDes";
    this.tab += idProgetto;
  }

  changeTabToRiep(idProgetto) {
    this.tab = "idRie";
    this.tab += idProgetto;
    this.firestore.collection("Progetto").doc(idProgetto).get().forEach(proj=>{
      if (proj.data().riepilogo!==undefined)
      {
        this.riepilogo.AvanzamentoProgetto=proj.data().riepilogo
      }
    })
  }

  changeTabToCand(idProgetto) {
    this.tab = "idCan";
    this.tab += idProgetto;
  }


  modificaRiepilogo(idProgetto) {
    if (this.isDisabled === true) {
      this.isDisabled = false;
      this.tastoModifica = "Salva";
    }
    else {
      this.isDisabled = true;
       this.modificaValori(idProgetto),
        this.tastoModifica ="Modifica";
    }
  }

  visualizzaCandidato(idProgetto) {
    this.partecipanti = [];
    this.firestore.collection("Progetto").doc(idProgetto).get().forEach((proj) => {

      this.progetto.idListaAttesa = proj.data().idListaAttesa;
      if (this.progetto.idListaAttesa !== undefined && this.progetto.idListaAttesa.length > 0) {
        this.progetto.idListaAttesa.forEach((idUser) => {

          this.firestore.collection("teamMate").doc(idUser).get().forEach((user) => {

            if (this.partecipanti === undefined) {

              this.partecipanti = [new partecipante(user.data().nome, user.data().cognome, idUser)]
            }
            else {
              this.partecipanti.push(new partecipante(user.data().nome, user.data().cognome, idUser))
            }

          });

        });

      }
    });

  }

  mostraDescrizione(idProgetto) {
    this.partecipanti = [];
    this.visualizzaCandidato(idProgetto);
    this.changeTabToCand(idProgetto);
  }

  accettaCandidato(idProgetto, idUser) {
    this.progetto.idListaAttesa = []
    this.progetto.idPartecipanti = []
    this.firestore.collection("Progetto").doc(idProgetto).get().forEach((proj) => {

      this.progetto.idListaAttesa = proj.data().idListaAttesa;
      this.progetto.idPartecipanti = proj.data().idPartecipanti;
      this.progetto.num_teamMate = proj.data().num_teamMate;
      this.progetto.num_teamMate++;

      if (this.progetto.idPartecipanti === undefined) {
        this.progetto.idPartecipanti = [idUser];

      }
      else {

        this.progetto.idPartecipanti.push(idUser);

      }
      this.progetto.idListaAttesa.splice(this.progetto.idListaAttesa.indexOf(idUser), 1)

      this.firestore.collection("Progetto").doc(idProgetto).update({
        idPartecipanti: this.progetto.idPartecipanti,
        idListaAttesa: this.progetto.idListaAttesa,
        num_teamMate: this.progetto.num_teamMate,
      })
      console.log(this.progetto.num_teamMate)
    });

    this.accettazione = 1;
    window.confirm("La pagina si aggiornerà per visualizzare la modifica dello stato!!");

  }

  rifiutaCandidato(idProgetto, idUser) {

    this.progetto.idListaAttesa = []
    this.progetto.idPartecipanti = []

    this.firestore.collection("Progetto").doc(idProgetto).get().forEach((proj) => {

      this.progetto.idListaAttesa = proj.data().idListaAttesa;

      this.progetto.idListaAttesa.splice(this.progetto.idListaAttesa.indexOf(idUser), 1)

      this.firestore.collection("Progetto").doc(idProgetto).update({
        idListaAttesa: firebase.firestore.FieldValue.delete()
      })
    });


    this.accettazione = 0;
    window.confirm("La pagina si aggiornerà per visualizzare la modifica dello stato!!");

  }

}


