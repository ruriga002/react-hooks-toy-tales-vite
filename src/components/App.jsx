import React, { useEffect, useState } from "react";
import ToyCard from "./ToyCard";
import ToyForm from "./ToyForm";

function App() {
  const [toys, setToys] = useState([]);

  // LOAD toys on page mount
  useEffect(() => {
    fetch("http://localhost:3000/toys")
      .then((r) => r.json())
      .then(setToys);
  }, []);

  // LIKE toy
  function handleLike(id) {
    const toy = toys.find((t) => t.id === id);

    fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: toy.likes + 1,
      }),
    })
      .then((r) => r.json())
      .then((updatedToy) => {
        setToys((prev) =>
          prev.map((t) => (t.id === id ? updatedToy : t))
        );
      });
  }

  // DELETE toy (DONATE)
  function handleDelete(id) {
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "DELETE",
    }).then(() => {
      setToys((prev) => prev.filter((toy) => toy.id !== id));
    });
  }

  // ADD new toy
  function handleAddToy(newToy) {
    const toyToSend = {
      ...newToy,
      likes: 0,
    };

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toyToSend),
    })
      .then((r) => r.json())
      .then((toyFromServer) => {
        setToys((prev) => [...prev, toyFromServer]);
      });
  }

  return (
    <div>
      <ToyForm onAddToy={handleAddToy} />

      <div id="toy-collection">
        {toys.map((toy) => (
          <ToyCard
            key={toy.id}
            toy={toy}
            onLike={handleLike}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default App;