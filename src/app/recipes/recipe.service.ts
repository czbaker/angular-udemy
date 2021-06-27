import { Injectable, EventEmitter } from "@angular/core";
import { Recipe } from "./recipes.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {

  // Select Recipe Event
  recipeSelected = new EventEmitter<Recipe>();

  // Inject service
  constructor(private slService: ShoppingListService) { }

  // Recipe List
  private recipes: Recipe[] = [
    new Recipe(
      'Test Recipe #1',
      'This is just a test, yo.',
      'https://www.cookingclassy.com/wp-content/uploads/2019/09/meatballs-21-600x900.jpg',
      [
        new Ingredient('Hamburger', 1),
        new Ingredient('Sauce', 1),
      ]
    )
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

}
