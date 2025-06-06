import { useEffect, useState } from "react";
import { Joke } from "./Jokes";
import { jokesList } from "./jokeList";

export const Jokes = ({ onJokeClose }) => {
  const [showJoke, setShowJoke] = useState(false);
  const [joke, setJoke] = useState("");

  useEffect(() => {
    const shownDate = localStorage.getItem("jokeModalShownDate");
    const today = new Date().toISOString().split("T")[0];

    if (shownDate !== today) {
      const random = Math.floor(Math.random() * jokesList.length);
      setJoke(jokesList[random]);
      setShowJoke(true);
    }
  }, []);

  const handleClose = () => {
    const today = new Date().toISOString().split("T")[0];
    localStorage.setItem("jokeModalShownDate", today);
    setShowJoke(false);
    onJokeClose();
  };

  return showJoke ? <Joke joke={joke} onClose={handleClose} /> : null;
};
