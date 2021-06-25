import { Component, OnInit } from '@angular/core';

// Ingredient Model
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Sugar', 1)
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
