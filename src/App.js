import React, { useState, useEffect, useContext } from "react";
import "./App.scss";

import Header from "./components/header/header.component";
import Registration from "./components/registration/registration.component";
import Draw from "./components/draw/draw.component";
import Confirmation from "./components/confirmation/confirmation.component";

import NamesListContext from "./context/names-list/names-list.context";
import DrawContext from "./context/draw/draw.context";
import { StatusContext } from "./provider/status/status.provider";

function App() {
  const [namesList, setNamesList] = useState([]);
  const [confirmDraw, setConfirmDraw] = useState(false);
  const [drawList, setDrawList] = useState(namesList);
  const [drawnNames, setDrawnNames] = useState([]);
  const [pick, setPick] = useState("");

  const { started } = useContext(StatusContext);

  useEffect(() => {}, [started]);

  return (
    <div className="drawer">
      <NamesListContext.Provider value={{ namesList, setNamesList }}>
        <DrawContext.Provider
          value={{
            confirmDraw,
            setConfirmDraw,
            drawList,
            setDrawList,
            drawnNames,
            setDrawnNames,
            pick,
            setPick,
          }}
        >
          <header className="header">
            <Header />
          </header>
          <main className="main">
            <Registration />
            <Draw />
            <Confirmation />
          </main>
        </DrawContext.Provider>
      </NamesListContext.Provider>
    </div>
  );
}

export default App;
