import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from "../../recipes.model";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  // Properties
  @Input() recipe: Recipe;
  @Output() recipeSelected = new EventEmitter<void>();

  onSelected() {
    this.recipeSelected.emit();
  }

  constructor() { }

  ngOnInit(): void {
  }

}
