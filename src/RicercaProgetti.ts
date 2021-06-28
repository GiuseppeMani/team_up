import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from "@angular/fire/auth";
import { Component, OnInit, Inject } from '@angular/core';

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

class RicercaProgetto {
    private static _instance: RicercaProgetto;
    private progetti: progetto[];
    private firestore: AngularFirestore;
    private idLoggato: string;
    public afAuth: AngularFireAuth;
    partecipa: boolean;
    constructor() { }
    public static get Instance() {
        // Do you need arguments? Make it a regular static method instead.
        return this._instance || (this._instance = new this());
    }
    setfirestore(firestore, afAuth) {
        this.firestore = firestore
        this.afAuth = afAuth
    }

    async ricercaTitoloProgetto(titoloProgetto) {

        this.progetti = []
        this.partecipa = false

        var nomeProj: String
        this.afAuth.authState.subscribe((users) => {

            if (users != null) {
                this.idLoggato = users.uid;
            }
            
            this.firestore.collection("Progetto").get().forEach((projs) => {
                projs.forEach((proj) => {
                    nomeProj = proj.data().nome
                    nomeProj = nomeProj.toUpperCase()
                    titoloProgetto = titoloProgetto.toUpperCase()
                    if (nomeProj.search(titoloProgetto) > -1) {
                        this.firestore.collection("teamMate").doc(proj.data().teamLeader).get().forEach((user) => {
                            if (proj.data().teamLeader === this.idLoggato) {
                                this.partecipa = false
                            }
                            else {
                                this.partecipa = true
                            }

                            if (this.progetti != undefined) {
                                this.progetti.push(new progetto(proj.data().nome, proj.data().genere, proj.data().num_partecipanti, proj.data().num_teamMate, proj.data().descrizione, user.data().nome, user.data().cognome, this.partecipa, proj.id, proj.data().stato));
                            }
                            else {
                                this.progetti = [new progetto(proj.data().nome, proj.data().genere, proj.data().num_partecipanti, proj.data().num_teamMate, proj.data().descrizione, user.data().nome, user.data().cognome, this.partecipa, proj.id, proj.data().stato)];
                            }

                        }
                        )
                    }
                })
            })
        })
    }

    getProgetti() {
        return this.progetti
    }

}

export default RicercaProgetto