import { Component } from "@angular/core";
import { Category } from "../../config/types";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";


@Component({
    standalone: true,
    imports: [
      TableModule,
      ButtonModule,
    ],
    templateUrl: './categories-list.component.html',
    styleUrl: './categories-list.component.scss',
    providers: [],
  })

  export class CategoriesListComponent {
  
    addCategory() {}
   
  }
