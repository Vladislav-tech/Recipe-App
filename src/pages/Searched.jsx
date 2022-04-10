import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';

const Searched = () => {

  const [searchedItems, updateSearchedItems] = useState([]);
  const params = useParams();

  const getSearched = async (name) => {
    const URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY
      }&addRecipeInformation=true&query=${name}&number=12`
    const data = await fetch(URL);
    const recipes = await data.json();
    console.log(recipes.results);
    updateSearchedItems(recipes.results);

  
  };

  useEffect(() => {
    console.log(params)
    getSearched(params.search)
  }, [params.search])

  return (
    <Grid>
      {searchedItems.map((item) => {
        return (
          <Card key={item.id}>
            <Link to={`/recipe/${item.id}`}>
              <img src={item.image} alt={item.title} />
              <h4>{item.title}</h4>            
            </Link>
          </Card>
        );
      })}
    </Grid>
  )
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`;

const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }

  a {
    text-decoration: none;
  }

  h4 {
    text-align: center;
    padding: 1rem;
  }

`

export default Searched