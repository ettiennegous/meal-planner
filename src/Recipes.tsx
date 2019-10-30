import React from 'react';
import * as DBI from './db-interfaces';
import Helpers from './Helpers';

interface IStateProps {
    recipes: DBI.Recipe[]
  }
  
  interface IProps {
  
  }

class Recipes extends React.Component<IProps, IStateProps> {
      
      public render() {
        if(!this.state) return false;
        return (
            <ul>
              {this.state.recipes.map(Recipe => this.RenderRecipe(Recipe))}
            </ul>);
      }
    
      private RenderRecipe(Recipe: DBI.Recipe) {
        return (
        <li>
          {Recipe.type} - 
          {Recipe.name}
        </li>
        );
    
      }
      
      private FetchRecipes() {
        
        return Helpers.FetchSheetData<DBI.Recipe>(2, (entry: DBI.Entry, Recipe: DBI.Recipe) => {
          switch(entry.gs$cell.col) {
            case "1": 
              Recipe.id = entry.content.$t;
              break;
            case "2": 
              Recipe.type = entry.content.$t;
              break;
            case "3": 
              Recipe.name = entry.content.$t;
              break;
            case "4": 
            
              Recipe.serves = parseInt(entry.content.$t);
              break;
            case "5": 
              Recipe.preptimemin = parseInt(entry.content.$t);
              break;
            case "6": 
              Recipe.cooktimemin = parseInt(entry.content.$t);
            break;
            case "7": 
              Recipe.link = entry.content.$t;
            break;

          }
          return Recipe;
        });
      }
    
      public componentDidMount() {
    
        this.FetchRecipes().then((results) => {
          this.setState({ recipes: results});
          console.log(this.state.recipes);
        });
      }  
    }
    
export default Recipes;
    