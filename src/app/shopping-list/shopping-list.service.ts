import { Injectable, EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

@Injectable()
export class ShoppingListService {

  // Variable to hold Ingredients
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Sugar', 1)
  ];

  ingredientsChanged = new EventEmitter<Ingredient[]>();

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);  // Spread operator from ES6
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

}
