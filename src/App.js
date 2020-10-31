import { useState, useEffect } from "react";
import "./App.scss";

import { firestore } from "./firebase/firebase.utils";

function App() {
  const [namesList, setNamesList] = useState([]);
  const [newName, setNewName] = useState("");
  const [pick, setPick] = useState("");

  const [started, setStarted] = useState(false);

  const [drawList, setDrawList] = useState(namesList);

  // GET LIST FROM FIRESTORE ==========================================================
  const getList = async () => {
    const list = await firestore
      .collection("namesList")
      .doc("IQO5ByAj1unMjWmmDUbU")
      .get();
    setNamesList(list.data().natal);
  };

  // UPDATE LIST LOCALLY ==============================================================
  const updateList = (event) => {
    event.preventDefault();
    setNamesList([...namesList, newName]);
    console.log(namesList);
  };

  // SAVE NEW NAME ADDED ON INPUT =====================================================
  const handleChange = (event) => {
    setNewName(event.target.value);
  };

  // DELETE NAME FROM LIST LOCALLY ====================================================
  const deleteName = (i) => {
    const newList = namesList.filter((name, index) => index !== i);
    setNamesList(newList);
  };

  // UPDATE LIST ON FIRESTORE =========================================================
  const updateFirestore = async () => {
    await firestore
      .collection("namesList")
      .doc("IQO5ByAj1unMjWmmDUbU")
      .update({ natal: namesList });
  };

  // UPDATE DRAW LIST ON FIRESTORE ================================================
  const startDraw = async () => {
    updateFirestore();
    setStarted(true);

    await firestore
      .collection("drawList")
      .doc("4GmI6OEzxiStJmjf70i9")
      .update({ natal: namesList });

    setDrawList(namesList);
  };

  // DISABLE REGISTER-NEW-NAME BUTTON ================================================
  const stopDraw = () => {
    setStarted(false);
  };

  // PICK A NAME FROM LIST AND DELETE FROM LIST NAME LOCALLY ==========================
  const draw = async () => {
    const drawListFirestore = await firestore
      .collection("drawList")
      .doc("4GmI6OEzxiStJmjf70i9")
      .get();
    
    const newDrawList = drawListFirestore.data().natal

    const limit = newDrawList.length;

    const i = Math.floor(Math.random() * limit);

    setPick(newDrawList[i]);
    
    const newList = newDrawList.filter((name, index) => index !== i);
    setDrawList(newList)
    await firestore
      .collection("drawList")
      .doc("4GmI6OEzxiStJmjf70i9")
      .update({ natal: newList });
  };

  useEffect(() => {
    getList();
  }, [drawList]);

  return (
    <div className="drawer">
      <header className="header">
        <h1>AMIGO SECRETO - NATAL 2020</h1>
      </header>
      <main className="main">
        <section className="registration">
          <h4 className="registration__title">Cadastramento</h4>
          <form
            className="registration__form"
            onSubmit={(event) => updateList(event)}
          >
            <input
              type="text"
              placeholder="Insira o nome do participanete"
              name="name"
              value={newName}
              autoComplete="off"
              onChange={(event) => {
                handleChange(event);
              }}
            />
            <button
              type="submit"
              id="register-btn"
              disabled={started}
              className="registration__form--btn"
            >
              Cadastrar
            </button>
          </form>

          <section className="registration__list">
            {namesList.map((name, index) => (
              <span key={index} className="registration__list--name">
                <button
                  className="registration__list--delete-btn"
                  onClick={() => deleteName(index)}
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
                {name}
              </span>
            ))}
          </section>

          <div className="registration__buttons">
            <button
              disabled={!started}
              id="stop-draw"
              className="registration__buttons--stop"
              onClick={() => stopDraw()}
            >
              Cancelar Sorteio
            </button>
            <button
              disabled={started}
              id="start-draw"
              className="registration__buttons--start"
              onClick={() => startDraw()}
            >
              Iniciar Sorteio
            </button>
          </div>
        </section>
        <section className="picker">
          <button
            className="picker__draw--btn"
            onClick={() => draw()}
            disabled={!started}
          >
            Sortear
          </button>
          <p className="picker__draw--text">Você tirou @:</p>
          <p className="picker__draw--name">{pick}</p>
          <p className="picker__remaining">
            {drawList.length} sorteios restantes
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;