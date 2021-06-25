import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe('Test Recipe #1', 'This is just a test, yo.', 'https://www.cookingclassy.com/wp-content/uploads/2019/09/meatballs-21-600x900.jpg'),
    new Recipe('Test Recipe #2', 'This is just a test, yo!', 'https://www.cookingclassy.com/wp-content/uploads/2019/09/meatballs-21-600x900.jpg'),
    new Recipe('Test Recipe #3', 'This is still just a test, yo.', 'https://www.cookingclassy.com/wp-content/uploads/2019/09/meatballs-21-600x900.jpg')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
