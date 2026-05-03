import React, { useEffect, useState } from "react";
import ToyCard from "./ToyCard";
import ToyForm from "./ToyForm";

function App() {
  const [toys, setToys] = useState([]);

  // GET toys
  useEffect(() => {
    fetch("http://localhost:3000/toys")
      .then((r) => r.json())
      .then(setToys);
  }, []);

  // LIKE toy (PATCH request)
  function handleLike(id) {
    const toy = toys.find((t) => t.id === id);

    const updatedLikes = toy.likes + 1;

    fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: updatedLikes,
      }),
    })
      .then((r) => r.json())
      .then((updatedToy) => {
        // IMPORTANT: preserve order using map
        setToys((prev) =>
          prev.map((t) => (t.id === id ? updatedToy : t))
        );
      });
  }

  // DELETE toy
  function handleDelete(id) {
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "DELETE",
    }).then(() => {
      setToys((prev) => prev.filter((t) => t.id !== id));
    });
  }

  // ADD toy
  function handleAddToy(newToy) {
    const toyToSend = { ...newToy, likes: 0 };

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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