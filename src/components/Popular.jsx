import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/css';
import { Link } from 'react-router-dom';

const Popular = () => {

  const [popular, setPopular] = useState([]);

  useEffect(() => {

    if (localStorage.getItem('populars')) {
      const items = JSON.parse(localStorage.getItem('populars'));
      setPopular(items);
    } else {
      const URL = `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=10`;

      fetch(URL)
        .then(response => response.json())
        .then(data => {
          localStorage.setItem('populars', JSON.stringify(data.recipes))
          setPopular(data.recipes);
        })
    }


    
  }, []);

  return (
    <div>
      <Wrapper>
        <h3>Popular</h3>

        <Splide options={{
          perPage: 3,
          drag: 'free',
          arrows: false,
          pagination: false,
          gap: '2rem'
        }}>

          {popular.map(recipe => {
            return (
              <SplideSlide key={recipe.id}>
                <Card >
                  <Link to={`/recipe/${recipe.id}`}>
                    <p>{recipe.title}</p>
                    <img src={recipe.image} alt={recipe.title} />
                    <Gradient/>
                  </Link>
                </Card>
              </SplideSlide>
            )
          })}
        </Splide>
      </Wrapper>
    </div>
  );
}; 

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;

  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 90%;
    height: 90%;
    object-fit: cover;
  }

  p {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 10;
    text-shadow: 1px 1px black;
    color: white;
    font-weight: 600;
    font-size: 1rem;
    transform: translate(-50%,0);
    text-align: center;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 90%;
  height: 90%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
  border-radius: 2rem;
`;


export default Popular;