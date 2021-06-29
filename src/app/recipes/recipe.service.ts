import { Injectable } from "@angular/core";
import { Recipe } from "./recipes.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // Inject service
  constructor(private slService: ShoppingListService) { }

  // Recipe List
  private recipes: Recipe[] = [
    new Recipe(
      'Test Recipe #1',
      'This is just a test, yo.',
      'https://media-cldnry.s-nbcnews.com/image/upload/newscms/2019_21/2870431/190524-classic-american-cheeseburger-ew-207p-2870431.jpg',
      [
        new Ingredient('Hamburger', 1),
        new Ingredient('Tomato', 1),
        new Ingredient('Bun', 1)
      ]
    ),
    new Recipe(
      'Test Recipe #2',
      'This is still just a test, yo.',
      'https://www.cookingclassy.com/wp-content/uploads/2019/09/meatballs-21-600x900.jpg',
      [
        new Ingredient('Spaghetti', 1),
        new Ingredient('Sauce', 1),
      ]
    )
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeById(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}
