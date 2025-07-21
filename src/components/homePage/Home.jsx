import React, { useEffect, useState } from 'react';
import PantryCard from './PantryCard';
import Map from './Map';
import './Home.css';

function Home() {
  const [pantries, setPantries] = useState([]);
  const [selectedPantry, setSelectedPantry] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/pantries') 
      .then((res) => res.json())
      .then((data) => setPantries(data))
      .catch((err) => console.error('Error fetching pantries:', err));
  }, []);

  const handlePantryClick = (pantry) => {
    setSelectedPantry(pantry._id); // Update the selected pantry when a card is clicked
  };

  const handleMarkerClick = (pantry) => {
    setSelectedPantry(pantry._id); // Update the selected pantry when a map marker is clicked
    // Scroll the pantry card into view
    const element = document.getElementById(pantry._id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="container">
      <div id="mainHome">
        <div className="locationList">
          <p id="moreInfo">Click a pantry to locate on the map</p>
          {pantries.map((pantry) => (
            <PantryCard
              key={pantry._id}
              pantry={pantry}
              onClick={() => handlePantryClick(pantry)} // Clicking on card will update the selected pantry
              isSelected={pantry._id === selectedPantry} // Highlight selected pantry card
            />
          ))}
        </div>
        <div className="mapSection">
          <Map
            selectedPantry={selectedPantry}
            pantries={pantries}
            onMarkerClick={handleMarkerClick} 
          />
        </div>
      </div>
    </div>
  );
}

export default Home;