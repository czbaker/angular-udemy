import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipes.model";

@Injectable({ providedIn: 'root' })
export class DataStorageService {

  // Inject HTTP Service
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  // Save Recipes on Firebase
  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://ng-udemy-9724f-default-rtdb.firebaseio.com/recipes.json', recipes)
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>('https://ng-udemy-9724f-default-rtdb.firebaseio.com/recipes.json')
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
          })
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }

}
