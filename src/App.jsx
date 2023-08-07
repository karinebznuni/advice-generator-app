import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import divider from "./assets/divider.svg";
import dice from "./assets/dice.svg";

function App() {
  const [adviceNumber, setAdviceNumber] = useState(null);
  const [adviceText, setAdviceText] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getAdvice = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(import.meta.env.VITE_API_URL);
      const data = await response.json();
      const slip = data.slip;
      const number = slip.id;
      const text = slip.advice;

      setAdviceNumber(number);
      setAdviceText(text);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAdvice();
  }, []);

  return (
    <>
      <div className="card">
        <h1 className="title">ADVICE #{adviceNumber}</h1>
        <span className="advice">{adviceText}</span>
        <img src={divider} alt="" className="divider" />
        <button
          className={`dice-icon ${isLoading ? "rotate" : ""}`} onClick={getAdvice}
        >
          <img src={dice} alt="" />
        </button>
      </div>
    </>
  );
}

export default App;
