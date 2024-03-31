import { useState } from "react";
import "./App.css";
// import styles from "./index.css";
import Routes from "./routes";
import "./index.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes />
    </>
  );
}

export default App;
