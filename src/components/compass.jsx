import React, { useState } from 'react';
import { Compass } from 'lucide-react';

const moralDilemmas = [
  {
    situation: "Finding the wounded soldier",
    choices: [
      { direction: "N", action: "Help the soldier", value: "Compassion" },
      { direction: "E", action: "Ignore the soldier", value: "Self-preservation" },
      { direction: "S", action: "Report the soldier", value: "Patriotism" },
      { direction: "W", action: "Seek advice", value: "Caution" }
    ]
  },
  {
    situation: "Treating the enemy",
    choices: [
      { direction: "N", action: "Provide full medical care", value: "Medical ethics" },
      { direction: "E", action: "Offer minimal treatment", value: "Compromise" },
      { direction: "S", action: "Refuse treatment", value: "National loyalty" },
      { direction: "W", action: "Consult authorities", value: "Obedience" }
    ]
  },
  {
    situation: "Hiding the soldier",
    choices: [
      { direction: "N", action: "Hide indefinitely", value: "Humanitarian aid" },
      { direction: "E", action: "Hide temporarily", value: "Limited risk" },
      { direction: "S", action: "Turn him in", value: "Legal compliance" },
      { direction: "W", action: "Help him escape", value: "Active assistance" }
    ]
  }
];

const CompassFace = ({ selectedDirection, onClick }) => (
  <div className="relative w-80 h-80" onClick={onClick}>
    <div className="absolute inset-0 rounded-full border-8 border-amber-700 bg-amber-100 shadow-inner">
      {["N", "E", "S", "W"].map((direction, index) => (
        <div
          key={direction}
          className={`absolute w-16 h-16 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 ${
            selectedDirection === direction ? 'text-red-600 font-bold' : 'text-amber-800'
          }`}
          style={{
            top: direction === "N" ? "0%" : direction === "S" ? "100%" : "50%",
            left: direction === "W" ? "0%" : direction === "E" ? "100%" : "50%",
          }}
        >
          <span className="text-2xl">{direction}</span>
        </div>
      ))}
      <div className="absolute inset-0 flex items-center justify-center">
        <Compass size={100} className="text-amber-800" />
      </div>
    </div>
  </div>
);

const MoralCompassNavigator = () => {
  const [currentDilemma, setCurrentDilemma] = useState(0);
  const [selectedDirection, setSelectedDirection] = useState(null);
  const [selectedChoice, setSelectedChoice] = useState(null);

  const handleCompassClick = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    
    let newDirection;
    if (Math.abs(x) > Math.abs(y)) {
      newDirection = x > 0 ? "E" : "W";
    } else {
      newDirection = y > 0 ? "S" : "N";
    }
    
    setSelectedDirection(newDirection);
    setSelectedChoice(moralDilemmas[currentDilemma].choices.find(c => c.direction === newDirection));
  };

  const handleNextDilemma = () => {
    setCurrentDilemma((prev) => (prev + 1) % moralDilemmas.length);
    setSelectedDirection(null);
    setSelectedChoice(null);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-amber-800">Moral Compass Navigator</h2>
      <div className="flex flex-col items-center mb-8">
        <CompassFace selectedDirection={selectedDirection} onClick={handleCompassClick} />
      </div>
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2 text-amber-900">{moralDilemmas[currentDilemma].situation}</h3>
        <p className="text-lg text-amber-700">Click on a direction to explore moral choices</p>
      </div>
      {selectedChoice && (
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <p className="text-lg font-semibold mb-2 text-amber-800">Your choice: {selectedChoice.action}</p>
          <p className="text-md text-amber-700">This reflects the value of: {selectedChoice.value}</p>
        </div>
      )}
      <button 
        onClick={handleNextDilemma}
        className="w-full py-2 px-4 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
      >
        Next Moral Dilemma
      </button>
    </div>
  );
};

export default MoralCompassNavigator;