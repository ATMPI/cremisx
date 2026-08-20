import React from "react";
import PracticeComponent from "./PracticeComponent";

export default function App() {
  const [userNumber, setUserNumber] = React.useState("");
  const [randomInput, setRandomInput] = React.useState("");
  const fib = React.useCallback((n) => {
    return n <= 1 ? n : fib(n - 1) + fib(n - 2);
  }, []);

  const fibNumber = React.useMemo(() => fib(userNumber), [userNumber, fib]);
  React.useEffect(() => {
    console.log("new number");
  }, [fibNumber]);

  return (
    <div className="container">
      <PracticeComponent
        label="Febunacci Sequence"
        handleChange={(e) => setUserNumber(e)}
      ></PracticeComponent>
      <div style={{ color: "white" }}>
        fib:
        <span className="fibResult">{fibNumber || "--"}</span>
      </div>
      <PracticeComponent
        label="Random Input"
        handleChange={(e) => setRandomInput(e)}
      ></PracticeComponent>
      <p>{randomInput || "--"}</p>
    </div>
  );
}
