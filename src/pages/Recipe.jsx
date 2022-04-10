import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const Recipe = () => {

  const params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState('instructions');

  const fetchDetails = async (name) => {
    const URL = `https://api.spoonacular.com/recipes/${name}/information?apiKey=${process.env.REACT_APP_API_KEY}`;
    const data = await fetch(URL);
    const detailData = await data.json();
    setDetails(detailData)
  }

  useEffect(() => {
    fetchDetails(params.name)
  }, [params.name])

  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt={details.title} />
      </div>
      <Info>
        <Button 
          className={activeTab === 'instructions' ? 'active' : ''} 
          onClick={() => setActiveTab('instructions')}
        >Instructions</Button>
        <Button 
          className={activeTab === 'ingredients' ? 'active' : ''} 
          onClick={() => setActiveTab('ingredients')}
        >Ingredients</Button>
        <div>
          {activeTab === 'instructions' && (
            <div>
              <p dangerouslySetInnerHTML={{ __html: details.summary }}></p>
              <p dangerouslySetInnerHTML={{ __html: details.instructions }}></p>
            </div>
          )}

          {activeTab === 'ingredients' && (
            <div>
              <ul>
                {details.extendedIngredients && details.extendedIngredients.map(item => {
                  return <li key={item.id}>{item.original}</li>
                })}
              </ul>
            </div>         
             )}

        </div>
      </Info>
    </DetailWrapper>
  )
}

const DetailWrapper = styled.div`
  margin-top: 5rem;
  margin-bottom: 5rem;
  display: flex;
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  h2 {
    margin-bottom: 2rem;
  }

  p {
    margin: 1rem 0;
  }

  li {
    font-size: 1.2rem;
    margin: 1rem 0;
  }
  ul {
    margin-top: 2rem;
  }

`

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background-color: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
  cursor: pointer;
  transition: .4s;
`

const Info = styled.div`
  margin-left: 10rem;
`

export default Recipe