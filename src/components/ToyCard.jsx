import React from "react";

function ToyCard({ toy, onLike, onDelete }) {
  return (
    <div data-testid="toy-card">
      <h2>{toy.name}</h2>
      <img src={toy.image} alt={toy.name} />
      <p>{toy.likes} Likes </p>

      <button onClick={() => onLike(toy.id)}>
        Like {"<3"}
      </button>

      {/* DONATE = DELETE */}
      <button onClick={() => onDelete(toy.id)}>
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;