import { Component, OnInit } from '@angular/core';

// Ingredient Model
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  // Props
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Sugar', 1)
  ];

  // Helpers
  onIngredientAdded(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
