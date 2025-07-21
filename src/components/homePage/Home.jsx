import React, { useEffect, useState } from 'react';
import Map from './Map'; 
import SearchBar from './SearchBar';
import { fetchPantries } from '../../services/pantrySvc';
import './Home.css'
import PantryCard from './PantryCard';

const Home = () => {

  const [pantries, setPantries] = useState([]);
  const [selectedPantry, setSelectedPantry] = useState(null);

  useEffect(() => {
    const getPantries = async () => {
      try {
        const data = await fetchPantries();
        setPantries(data);
      } catch (err) {
        console.error('Error fetching pantries:', err);
      }
    }; getPantries()
  }, []);


  const popUp = () => {
    if(!selectedPantry)
      return null;

    return(
      <div className="popContainer">
        <div className="popFilling">
          <h2>{selectedPantry.pantryName}</h2>
           <p><strong>Address:</strong> {selectedPantry.address}, {selectedPantry.city}, {selectedPantry.state}, {selectedPantry.zipCode}</p>
          <p><strong>Hours:</strong> {selectedPantry.hours}</p>
          <p><strong>Requirements:</strong> {Array.isArray(selectedPantry.requirements) ? selectedPantry.requirements.join(', ') : ''}</p>
          <p><strong>Contact:</strong> {selectedPantry.contact}</p>
          <button onClick={() => setSelectedPantry(null)}>Close</button>
        </div>
      </div>
    )
   }

  return (
    <>

     <div id="mainHome">
      <div className="locationList">
   <p id="moreInfo">Click a pantry to locate on the map</p>
           {pantries.map((pantry) => (
            <PantryCard
              key={pantry._id}
              pantry={pantry}
              onClick={() => setSelectedPantry(pantry)} // Clicking on card will update the selected pantry
              isSelected={pantry._id === selectedPantry} // Highlight selected pantry card
            />
          ))}
        </div>
                
                
        <div className="mapSection">    
          <Map pantries={pantries} setSelectedPantry={setSelectedPantry} />
          <SearchBar /> 
             </div>
             </div>
                    {popUp()}
                    </>
    );
};




export default Home;