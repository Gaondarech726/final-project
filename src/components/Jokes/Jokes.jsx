import { useEffect } from "react";
import "./Jokes.scss";

export const Joke = ({ onClose, joke }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="JokeOverlay">
      <div className="YouSureJoke">
        <div className="data-container">
          <h3 className="YouSureTextJoke">Фінансовий жарт дня 💸</h3>
          <p style={{ fontWeight: "bold", textAlign: "center" }}>{joke}</p>
          <div className="YouSureButtons">
            <button className="btn-orange" onClick={onClose}>
              😄 Дякую!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
