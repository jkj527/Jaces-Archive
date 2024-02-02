import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style/Superlatives.css";

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
  const [superlatives, setSuperlatives] = useState([]);

  useEffect(() => {
    fetchSuperlatives();
  }, []);

  const fetchSuperlatives = async () => {
    try {
      const response = await axios.get("/api/superlatives");
      setSuperlatives(response.data);
    } catch (error) {
      console.error("Failed to fetch superlatives:", error);
    }
  };

  const incrementCount = async (name) => {
    try {
      await axios.patch(
        `/api/superlatives/${encodeURIComponent(name)}/increment`
      );
      fetchSuperlatives(); // Refresh the list to reflect the updated count
    } catch (error) {
      console.error("Failed to increment count:", error);
    }
  };

  const decrementCount = async (name) => {
    try {
      await axios.patch(
        `/api/superlatives/${encodeURIComponent(name)}/decrement`
      );
      fetchSuperlatives(); // Refresh the list to reflect the updated count
    } catch (error) {
      console.error("Failed to decrement count:", error);
    }
  };

  const handleAddSuperlative = async (e) => {
    e.preventDefault(); // Prevent page refresh
    if (newSuperlativeName.trim()) {
      try {
        await axios.post("/api/superlatives", { name: newSuperlativeName });
        setNewSuperlativeName(""); // Reset input field
        // Refetch or update the list locally to include the new superlative
        fetchSuperlatives(); // Assuming fetchSuperlatives is defined earlier or just add the new superlative to the state
      } catch (error) {
        console.error("Failed to add superlative:", error);
      }
    }
  };

  return (
    <div className="superlatives-container">
      <h2 className="superlatives-heading">Superlatives</h2>
      {superlatives.map((superlative) => (
        <SuperlativeItem
          key={superlative.name}
          name={superlative.name}
          count={superlative.count}
          onIncrement={() => incrementCount(superlative.name)}
          onDecrement={() => decrementCount(superlative.name)}
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
        <button type="submit" className="add-superlative-button">
          Add
        </button>
      </form>
    </div>
  );
};

export default Superlatives;
