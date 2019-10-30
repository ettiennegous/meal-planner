import React from 'react';
import * as DBI from './db-interfaces';
import Helpers from './Helpers';

interface IStateProps {
    ingredients: DBI.Ingredient[]
  }
  
  interface IProps {
  
  }

class Ingredients extends React.Component<IProps, IStateProps> {
      
      public render() {
        if(!this.state) return false;
        return (
            <ul>
              {this.state.ingredients.map(ingredient => this.RenderIngredient(ingredient))}
            </ul>);
      }
    
      private RenderIngredient(ingredient: DBI.Ingredient) {
        return (
        <li>
          {ingredient.category} - 
          {ingredient.desc}
        </li>
        );
    
      }
      
      private FetchIngredients() {
        return Helpers.FetchSheetData<DBI.Ingredient>(1, (entry: DBI.Entry, Ingredient: DBI.Ingredient) => {
            switch(entry.gs$cell.col) {
                case "1": 
                  Ingredient.category = entry.content.$t;
                  break;
                case "2": 
                  Ingredient.desc = entry.content.$t;
                  break;
                case "3": 
                  Ingredient.qtyweight = entry.content.$t;
                  break;
                case "4": 
                    Ingredient.wwsearch = entry.content.$t;
                  break;
                case "5": 
                    Ingredient.colessearch = entry.content.$t;
                  break;
              }
              return Ingredient;
        });
      }
    
      public componentDidMount() {
    
        this.FetchIngredients().then((results) => {
          this.setState({ ingredients: results});
        });
      }  
    }
    
export default Ingredients;
    