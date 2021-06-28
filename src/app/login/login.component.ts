import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  ngOnInit(): void {
  }

  constructor(public afAuth: AngularFireAuth, public router: Router) {  
    this.afAuth.signOut(); 
  }

  public teamMate = { email: "", password: "" };

  async login() {


    await this.afAuth.signInWithEmailAndPassword(this.teamMate.email, this.teamMate.password).then((user) => {
      if(user) {

        this.router.navigate(['/home']);

      }
    })
    .catch((error) => {

      window.confirm("Campi inseriti non validi!");

      this.router.navigateByUrl('/', ).then(() => {
        this.router.navigate(["/login"]); // navigate to same route
      });
      
    })

  }


}
