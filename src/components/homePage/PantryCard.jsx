import React from 'react';
import './Home.css';

function PantryCard({ pantry, onClick, isSelected }) {
  return (
    <div
      className={`locationCard ${isSelected ? 'selected' : ''}`} // Apply 'selected' class if it's selected
      onClick={onClick}
      id={pantry._id} // Use the pantry ID as the element ID for scrolling
    >
      <h3>{pantry.pantryName}</h3>
      <p>{pantry.address}, {pantry.city}, {pantry.state} {pantry.zipCode}</p>
      {pantry.hours && (<p><strong>Hours:</strong> {pantry.hours}</p>)}
      {pantry.contact && (<p><strong>Contact:</strong> {pantry.contact}</p>)}
    </div>
  );
}

export default PantryCard;