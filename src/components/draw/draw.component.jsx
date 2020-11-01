import React, { useContext, useEffect } from "react";

import { firestore } from "../../firebase/firebase.utils";
import DrawContext from "../../context/draw/draw.context";
import { StatusContext } from "../../provider/status/status.provider";

import Button from "../button/button.component";

const Draw = () => {
  const {
    pick,
    setPick,
    confirmDraw,
    setConfirmDraw,
    drawList,
    setDrawList,
  } = useContext(DrawContext);
  const { started } = useContext(StatusContext);

  const draw = async () => {
    // get drawList from firestore
    const drawListFirestore = await firestore
      .collection("drawList")
      .doc("I4ncvHNX22lo5NBCq69M")
      .get();

    const newDrawList = drawListFirestore.data().natal;

    // disable draw button, so no one can draw more than once
    document.getElementById("draw-btn").disabled = true;

    setConfirmDraw(true);

    // draw a name from drawList
    const limit = newDrawList.length;
    const i = Math.floor(Math.random() * limit);

    setPick(newDrawList[i]);

    confirmDrawToFirestore(newDrawList[i]);

    //create a new drawList without the last picker
    const newList = newDrawList.filter((name, index) => index !== i);

    // update DrawList on Firestore
    setDrawList(newList);
    await firestore
      .collection("drawList")
      .doc("I4ncvHNX22lo5NBCq69M")
      .update({ natal: newList });
  };

  const confirmDrawToFirestore = async (name) => {
    const drawnListFirestore = await firestore
      .collection("confirmationList")
      .doc("MDtliAQjdzNeWMYOjmw8")
      .get();

    const drawnList = drawnListFirestore.data().natal;

    // console.log([...drawnList, name]);

    try {
      await firestore
        .collection("confirmationList")
        .doc("MDtliAQjdzNeWMYOjmw8")
        .update({ natal: [...drawnList, name] });
    } catch (error) {
      console.log(error.message);
    }
  };

  const getDrawList = async () => {
    firestore
      .collection("drawnList")
      .onSnapshot((snapshot) =>
        snapshot.forEach((list) => setDrawList(list.data().natal))
      );
  };

  useEffect(() => {
    getDrawList();
    console.log("draw");
  }, []);

  return (
    <section className="picker">
      {drawList.length === 0 && started ? null : (
        <Button
          content={"Sortear"}
          className="picker__draw--btn"
          onClick={() => draw()}
          equalStarted={true}
          id="draw-btn"
        />
      )}

      {pick && started && confirmDraw ? (
        <React.Fragment>
          <p className="picker__draw--text">Você tirou @:</p>
          <p className="picker__draw--name">{pick}</p>
        </React.Fragment>
      ) : null}

      <p className="picker__remaining">
        {drawList.length === 0
          ? "Sorteio Finalizado!"
          : `${drawList.length} sorteios restantes`}
      </p>

      {confirmDraw && drawList.length > 0 ? (
        <Button
          content={"Novo Sorteio"}
          equalStarted={true}
          onClick={() => document.location.reload()}
          className="btn__right"
        />
      ) : null}
    </section>
  );
};

export default Draw;
