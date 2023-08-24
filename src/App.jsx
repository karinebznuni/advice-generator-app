import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import divider from "./assets/divider.svg";
import dice from "./assets/dice.svg";

function App() {
  const [adviceNumber, setAdviceNumber] = useState();
  const [adviceText, setAdviceText] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getAdvice = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("https://api.adviceslip.com/advice");
      const {
        slip: { id, advice },
      } = await response.json();
      setAdviceNumber(id);
      setAdviceText(advice);
    } catch (error) {
      console.log(error);
      setAdviceText("Failed to load advice.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAdvice();
  }, []);

  return (
    <div className="card">
      <h1 className="title">ADVICE #{adviceNumber}</h1>
      <span className="advice">{adviceText}</span>
      <img src={divider} alt="" className="divider" />
      <button
        className={`dice-icon ${isLoading ? "rotate" : ""}`}
        onClick={getAdvice}
      >
        <img src={dice} alt="dice" />
      </button>
    </div>
  );
}

export default App;
