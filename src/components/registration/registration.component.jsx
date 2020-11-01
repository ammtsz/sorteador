import React, { useContext, useState, useEffect } from "react";
import { firestore } from "../../firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";

import Button from "../button/button.component";
import NamesListContext from "../../context/names-list/names-list.context";
import { StatusContext } from "../../provider/status/status.provider";
import DrawContext from "../../context/draw/draw.context";

const Registration = () => {
  const { namesList, setNamesList } = useContext(NamesListContext);
  const { started, updateStatus } = useContext(StatusContext);
  const { setPick, setDrawList } = useContext(DrawContext);
  const [newName, setNewName] = useState("");

  const getList = async () => {
    firestore.collection("namesList").onSnapshot((snapshot) => {
      snapshot.forEach((list) => {
        setNamesList(list.data().natal);
        if (!started) setDrawList(list.data().natal);
      });
    });

    setPick("");
  };

  const updateList = async (event) => {
    event.preventDefault();

    if (newName === "") {
      window.confirm("Digite um nome antes de adicinar à lista");
    } else if (namesList.indexOf(newName) > -1) {
      window.confirm("Nome já cadastro. Digite outro nome!");
    } else {
      await firestore
        .collection("namesList")
        .doc("6r9CHwmpUKbpokzfOrwy")
        .update({ natal: [...namesList, newName] });

      setNamesList([...namesList, newName]);
      setNewName("");
    }
  };

  const deleteName = async (i) => {
    const newList = namesList.filter((name, index) => index !== i);
    await firestore
      .collection("namesList")
      .doc("6r9CHwmpUKbpokzfOrwy")
      .update({ natal: newList });

    setNamesList(newList);
  };

  const startDraw = async () => {
    updateStatus(true);

    await firestore
      .collection("drawList")
      .doc("I4ncvHNX22lo5NBCq69M")
      .update({ natal: namesList });

    setDrawList(namesList);
  };

  useEffect(() => {
    getList();
    console.log("registration");
  }, [started]);

  return (
    <section className="registration">
      <FormInput
        handleSubmit={updateList}
        setData={setNewName}
        value={newName}
        equalStarted={false}
        placeholder="Adicionar novo participante"
        disabled={started}
        name="name"
        btnContent="Adicionar"
      />

      <section className="registration__list">
        {namesList.sort().map((name, index) => (
          <span key={index} className="registration__list--name">
            <button
              className="registration__list--delete-btn"
              disabled={started}
              onClick={() => deleteName(index)}
            >
              {!started ? <i className="fas fa-trash-alt"></i> : null}
            </button>
            {name}
          </span>
        ))}
      </section>

      <div className="registration__buttons">
        <Button
          content={"iniciar Sorteio"}
          equalStarted={false}
          id="start-draw"
          className="registration__buttons--start"
          onClick={() => startDraw()}
        />
      </div>
    </section>
  );
};

export default Registration;
