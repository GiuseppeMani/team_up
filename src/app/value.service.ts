import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValueService {

  public valore = new BehaviorSubject<boolean>(false);
  cast = this.valore.asObservable();

  constructor() { }

  changeValue() {
    this.valore.next(!this.valore.value);
  }
}
