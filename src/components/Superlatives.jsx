// src/components/Superlatives.jsx
import React, { useState } from "react";
import "./style/Superlatives.css"; // You will create this CSS file for styling

const SuperlativeItem = ({ name, count, onIncrement, onDecrement }) => {
  return (
    <div className="superlative-item">
      <p className="superlative-name">{name}</p>
      <div className="superlative-controls">
        <button onClick={onDecrement}>-</button>
        <span className="superlative-count">{count}</span>
        <button onClick={onIncrement}>+</button>
      </div>
    </div>
  );
};

const Superlatives = () => {
  const [newSuperlativeName, setNewSuperlativeName] = useState("");
  const [superlatives, setSuperlatives] = useState([
    { name: "Number of times Jake has been Bojuka Bog'd", count: 2 },
    { name: "Number of times Scott has played Castle Garenbrig", count: 0 },
    { name: "Number of times Ben won because his bullshit made everyone concede", count: 2 },
    { name: "Double sixes", count: 1 },
    { name: "Snake eyes", count: 1 },
    { name: "Double sixes and snake eyes in the same game by the same person", count: 1 },
    // ... other superlatives
  ]);

  const incrementCount = (index) => {
    const newSuperlatives = [...superlatives];
    newSuperlatives[index].count += 1;
    setSuperlatives(newSuperlatives);
  };

  const decrementCount = (index) => {
    const newSuperlatives = [...superlatives];
    if (newSuperlatives[index].count > 0) {
      newSuperlatives[index].count -= 1;
    }
    setSuperlatives(newSuperlatives);
  };

  const handleAddSuperlative = (e) => {
    e.preventDefault(); // Prevent page refresh
    if (newSuperlativeName.trim()) {
        const newSuperlatives = [
            ...superlatives,
            { name: newSuperlativeName, count: 0 },
        ];
        setSuperlatives(newSuperlatives);
        setNewSuperlativeName(''); // Reset input field
    }
};

  return (
    <div className="superlatives-container">
      <h2 className="superlatives-heading">Superlatives</h2>
      {superlatives.map((superlative, index) => (
        <SuperlativeItem
          key={index}
          name={superlative.name}
          count={superlative.count}
          onIncrement={() => incrementCount(index)}
          onDecrement={() => decrementCount(index)}
        />
      ))}
        <form className="superlative-form" onSubmit={handleAddSuperlative}>
            <input
                type="text"
                value={newSuperlativeName}
                onChange={(e) => setNewSuperlativeName(e.target.value)}
                placeholder="Enter new superlative"
                className="superlative-input"
            />
            <button type="submit" className="add-superlative-button">Add</button>
        </form>
    </div>
  );
};

export default Superlatives;
