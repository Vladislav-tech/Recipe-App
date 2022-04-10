import React, { useEffect, useState } from 'react';
import style from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
 
const Cuisine = () => {
  const [cuisine, setCuisine] = useState([])
  const params = useParams();

  
  const getCuisine = async (name) => {
    if (localStorage.getItem(name)) {
      const items = JSON.parse(localStorage.getItem(name));
      setCuisine(items);
    } else {
      const URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY
        }&addRecipeInformation=true&cuisine=${name}&number=12`
      const data = await fetch(URL);
      const recipes = await data.json();
      localStorage.setItem(name, JSON.stringify(recipes.results));
      setCuisine(recipes.results);    }

 
  };

  useEffect(() => {
    getCuisine(params.type)
  }, [params.type]);
  return (
    <Grid
      animate={{ opacity: 1}}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0}}
      transition={{ duration: 0.5 }}
    >
      {cuisine.map((item) => {
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
  );
};

const Grid = style(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`;

const Card = style.div`
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

export default Cuisine;