import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { ValueService } from '../value.service';
import { Router } from '@angular/router';
import RicercaProgetto from '../../RicercaProgetti'
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public logged = false;
  valore: boolean;
  IstanzaRicerca
  daCercare: String
  IstanzaRicercaNome

  constructor(public afAuth: AngularFireAuth, public router: Router, private valueservice: ValueService, public firestore: AngularFirestore) {
    
    this.isLogged();

    this.IstanzaRicerca = RicercaProgetto.Instance;
    this.IstanzaRicerca.setfirestore(this.firestore, this.afAuth, this.router);

  }

  links: Array<{ text: string, path: string }>;

  ngOnInit(): void {

  }

  /* PER CHIAMARE ID UTENTE /
  / console.log(this.afAuth.authState.subscribe((user)=>{console.log(user.uid)})); */

  isLogged() {
    this.afAuth.authState.subscribe((user) => {
      if (user === null) {
        this.logged = false
      }
      else {
        this.logged = true
      }
    })

    this.valueservice.cast.subscribe(data => this.valore = data);
  }

  async logoutUser() {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  logoutAdmin() {
    this.valore = false;
    this.router.navigate(['/Pro342']);
  }

  async ricercaTitolo() {
    
    await this.IstanzaRicerca.ricercaTitoloProgetto(this.daCercare)
    this.router.navigateByUrl('/', ).then(() => {
      this.router.navigate(["/home"]); // navigate to same route
    });
    
  }

}