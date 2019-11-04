import React from 'react';
import * as DBI from './db-interfaces';
import Helpers from './Helpers';
import Box from './Box';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

interface IStateProps {
  recipes: DBI.Recipe[]
}

interface IProps {

}

class Recipes extends React.Component<IProps, IStateProps> {

  public render() {
    if (!this.state) return false;
    return (this.state.recipes.map(Recipe => this.RenderRecipe(Recipe)));
  }

  private RenderRecipe(Recipe: DBI.Recipe) {
    return (
      <>
      <Box name={Recipe.type + ' - ' + Recipe.name}>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="https://static.onecms.io/wp-content/uploads/sites/35/2019/02/03185446/keto-diet-meal-plan_1.jpg" />
          <Card.Body>
            <Card.Title>{Recipe.name}</Card.Title>
            <Card.Text>
              {Recipe.type}
            </Card.Text>
            {Recipe.link && <Button variant="primary" href={Recipe.link}>Details</Button>}
          </Card.Body>
        </Card>
      </Box>
      </>
        );

  }

  private FetchRecipes() {

    return Helpers.FetchSheetData<DBI.Recipe>(2, (entry: DBI.Entry, Recipe: DBI.Recipe) => {
      switch (entry.gs$cell.col) {
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
      this.setState({ recipes: results });
      console.log(this.state.recipes);
    });
  }
}

export default Recipes;
