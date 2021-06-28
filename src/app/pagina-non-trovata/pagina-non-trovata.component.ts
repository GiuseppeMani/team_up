import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina-non-trovata',
  template: `
  <div class="container">
  <div class="row">
      <div class="col-md-12">
          <div class="error-template">
              <h1 class="text-white text-center">
                  Oops!</h1>
              <h2 class="text-white text-center">
                  404 Not Found</h2>
              </div>
          </div>
  </div>
</div>
  `,
  styles: [
  ]
})
export class PaginaNonTrovataComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
