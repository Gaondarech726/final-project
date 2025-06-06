import { useEffect, useState } from "react";
import { Joke } from "./Jokes";
import { jokes } from "./jokeList";

export const Jokes = () => {
  const [showModal, setShowModal] = useState(false);
  const [joke, setJoke] = useState("");

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const lastShown = localStorage.getItem("jokeModalShownDate");

    if (lastShown !== today) {
      const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
      setJoke(randomJoke);
      setShowModal(true);
      localStorage.setItem("jokeModalShownDate", today);
    }
  }, []);

  if (!showModal) return null;

  return <Joke joke={joke} onClose={() => setShowModal(false)} />;
};
