import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';
import { ValueService } from '../value.service';
import { AngularFirestore } from '@angular/fire/firestore';
import RicercaProgetto from '../../RicercaProgetti'

class progetto {

  public nome;
  public genere;
  public num_partecipanti;
  public num_teamMate;
  public descrizione;
  public nomeTeamLeader;
  public cognomeTeamLeader;
  public partecipa;
  public stato;
  public idProgetto;

  constructor(@Inject(String) nome, @Inject(String) genere, @Inject(String) num_partecipanti, @Inject(String) num_teamMate, @Inject(String) descrizione, @Inject(String) nomeTeamLeader, @Inject(String) cognomeTeamLeader, @Inject(Boolean) partecipa, @Inject(String) idProgetto, @Inject(String) stato) {

    this.nome = nome;
    this.genere = genere;
    this.num_partecipanti = num_partecipanti;
    this.num_teamMate = num_teamMate;
    this.descrizione = descrizione;
    this.nomeTeamLeader = nomeTeamLeader;
    this.cognomeTeamLeader = cognomeTeamLeader;
    this.partecipa = partecipa;
    this.stato = stato;
    this.idProgetto = idProgetto;

  }



}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  public id;
  isAdmin: boolean;
  accesso: boolean;
  prelievo: boolean;
  idLoggato: string;
  public progetti: progetto[];
  nomeTL: string;
  cognomeTL: string;
  partecipa: boolean;
  public logged = false;

  public progetto = { nome: "", descrizione: "", genere: "", num_partecipanti: "", teamLeader: "", data_pubblicazione: null, num_teamMate: 0, stato: "aperto", idListaAttesa: [], idPartecipanti: [] };

  constructor(public afAuth: AngularFireAuth, public router: Router, public firestore: AngularFirestore, private valueservice: ValueService) {
    

    this.afAuth.authState.subscribe((user) => {
      console.log(user)
      if ((user === null) && (this.isAdmin === false)) {
        this.router.navigate(['/login']);
      }

      if (user != null) {
        this.logged = true;
      }

    });

    const IstanzaRicerca = RicercaProgetto.Instance
    this.progetti = IstanzaRicerca.getProgetti()


    if (this.progetti === undefined) {
      this.AcquisizioneProgetti();
    }

  }

  ngOnInit(): void {

  }

  AcquisizioneProgetti() {

    this.afAuth.authState.subscribe((users) => {

      if (users != null) {
        this.idLoggato = users.uid;
      }

      this.firestore.collection("Progetto").get().forEach((projs) => {
        projs.forEach((proj) => {
          this.firestore.collection("teamMate").doc(proj.data().teamLeader).get().forEach((user) => {
            this.nomeTL = user.data().nome;
            this.cognomeTL = user.data().cognome;

            if (proj.data().teamLeader === this.idLoggato) {
              this.partecipa = false
            }
            else {
              this.partecipa = true
            }

            if (this.progetti != undefined) {
              this.progetti.push(new progetto(proj.data().nome, proj.data().genere, proj.data().num_partecipanti, proj.data().num_teamMate, proj.data().descrizione, this.nomeTL, this.cognomeTL, this.partecipa, proj.id, proj.data().stato));
            }
            else {
              this.progetti = [new progetto(proj.data().nome, proj.data().genere, proj.data().num_partecipanti, proj.data().num_teamMate, proj.data().descrizione, this.nomeTL, this.cognomeTL, this.partecipa, proj.id, proj.data().stato)];
            }
          }
          )
        });
      });

    })
  }

  partecipaProgetto(ID_Progetto_Selezionato) {

    this.firestore.collection("Progetto").doc(ID_Progetto_Selezionato).get().forEach((proj) => {

      this.progetto.idListaAttesa = proj.data().idListaAttesa;
      this.progetto.idPartecipanti = proj.data().idPartecipanti;

      if (proj.data().idListaAttesa === undefined) {
        this.progetto.idListaAttesa = [this.idLoggato]
      }
      else {
        if ((this.progetto.idListaAttesa.indexOf(this.idLoggato) === -1) && (this.progetto.idPartecipanti.indexOf(this.idLoggato) === -1)) {
          this.progetto.idListaAttesa.push(this.idLoggato)
        }
        else {
          window.confirm("Hai già fatto richiesta di partecipazione per questo progetto")
        }


      }
      this.firestore.collection("Progetto").doc(ID_Progetto_Selezionato).set({
        ...proj.data(),
        idListaAttesa: this.progetto.idListaAttesa,
      })
    })


  }

  eliminaProgetto(idProgetto) {
    this.firestore.collection("Progetto").doc(idProgetto).delete();

    this.router.navigateByUrl('/', ).then(() => {
      this.router.navigate(["/home"]); // navigate to same route
    });
    
  }

}
