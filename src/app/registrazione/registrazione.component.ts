import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.scss']
})
export class RegistrazioneComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, public firestore: AngularFirestore, public router: Router) {
    this.afAuth.signOut().then(() => {
      this.afAuth.authState.subscribe((user) => {
        if (user != null)
          this.router.navigate(['/home']);
      })
    });
  }

  public teamMate = { nome: "", cognome: "", numero_telefono: "", citta: "", email: "", password: "", confPassword: "", descrizione: ""};

  ngOnInit(): void {
  }

  
  async registrazione() {

    if ((this.teamMate.password === this.teamMate.confPassword) && (this.teamMate.nome != "") && (this.teamMate.cognome != "") && (this.teamMate.citta != "")) {

      var result = await this.afAuth.createUserWithEmailAndPassword(this.teamMate.email, this.teamMate.password);
      this.firestore.collection("teamMate").doc(result.user.uid).set({
        nome: this.teamMate.nome,
        cognome: this.teamMate.cognome,
        numero_telefono: this.teamMate.numero_telefono,
        citta: this.teamMate.citta,
        descrizione: this.teamMate.descrizione
      });
      
      (await this.afAuth.currentUser).sendEmailVerification().then(function() {
        // Email sent.
      }).catch(function(error) {
        // An error happened.
      });

      this.router.navigate(['/home']);

    }
    else {

     window.confirm("Campi inseriti non validi!");

    }
  }

}
