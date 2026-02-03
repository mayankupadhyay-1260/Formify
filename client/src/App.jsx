import { useEffect, useState } from "react";
import Builder from "./components/builder/Builder";
import "./index.css"

function App() {

  useEffect(() => {
    fetch("http://localhost:3000",{method:"GET"})
      .then(res => res.text())
      .then(data => setMsg(data));
  }, []);

  return (
    <Builder/>
  );
}

export default App;
