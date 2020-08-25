import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

const SEARCH_ENDPOINT =
  "https://api-dev.insurando.ch/v1/products/health/basic/doctorlist";

const App = () => {
  const [physicians, setPhysicians] = useState<any[]>([]);

  useEffect(() => {
    fetch(SEARCH_ENDPOINT, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ loc: "zürich" }),
    })
      .then((r) => r.json())
      .then((r) => setPhysicians(r));
  }, []);

  return (
    <div>
      {physicians.map((physician) => {
        return <div>{JSON.stringify(physician)}</div>;
      })}
    </div>
  );
};

export default App;
