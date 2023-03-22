import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BreedAttributes from './BreedAttributes';

const Discover = () => {
  const [data, setData] = useState(null);
  const [currBreed, setCurrBreed] = useState(null);
  const [currBreedAttributes, setCurrBreedAttributes] = useState([]);
  const [currImage, setCurrImage] = useState("")
  const API_KEY = 'YOUR_API_KEY_HERE';
  const [bannedAttributes, setBannedAttributes] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.thecatapi.com/v1/breeds`);
        console.log(response.data);
        setData(response.data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (data) {
        const filteredData = data.filter(breed => {
        for (const attribute of bannedAttributes) {
            if (breed.name === attribute || breed.origin === attribute || breed.life_span === attribute) {
                return false;
            }
        }
        return true;
        });
        setData(filteredData);
        console.log(data)
    }
  }, [bannedAttributes]);

  const addToBannedList = (attribute) => {
    setBannedAttributes((prevBannedAttributes) => [...prevBannedAttributes, attribute]);
  };
  
  const handleClick = async () => {
    if (data) {
        setCurrBreed(data[Math.floor(Math.random() * data.length)]);
        let id = currBreed.reference_image_id;
        console.log(currBreed);
        let url = `https://api.thecatapi.com/v1/images/${id}?api_key=live_dO6qV64kIwvdxyv7gSmynhIs20gTMmjFEQ8bGthYLlmK0zjVUr9XsrhJKiP39Fwm`
        console.log(url)
        const response = await axios.get(url);
        const image = response.data;
        setCurrBreedAttributes([currBreed.name, currBreed.origin, currBreed.life_span])
        console.log(currBreedAttributes)
        setCurrImage(image.url)
        console.log(currImage)
    }
  };

//   if (data) {
//     setCurrBreed(data[Math.floor(Math.random(67))]);
//   }
  return (
    <div>
      {currImage != "" && <img src={currImage} width="250" height="250"></img>}
      <button onClick={handleClick}>Discover</button>
      {currBreedAttributes && <BreedAttributes attributes={currBreedAttributes} onAttributeSelect={addToBannedList} />}
      <p>Banned List: {bannedAttributes.toString()}</p>
    </div>
  );
};

export default Discover;
