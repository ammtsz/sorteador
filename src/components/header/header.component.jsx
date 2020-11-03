import React, { useContext, useEffect } from "react";
import "./header.styles.scss";

import DrawContext from "../../context/draw/draw.context";
import NamesListContext from "../../context/names-list/names-list.context";
import Button from "../../components/button/button.component";

import { firestore } from "../../firebase/firebase.utils";

import { StatusContext } from "../../provider/status/status.provider";

const Registration = () => {
  const { started, updateStatus } = useContext(StatusContext);
  const { setPick, setDrawList, setConfirmDraw } = useContext(DrawContext);
  const { namesList } = useContext(NamesListContext);

  const stopDraw = async () => {
    if (window.confirm("Deseja CANCELAR sorteio atual e começar um novo?")) {
      await firestore
        .collection("confirmationList")
        .doc("MDtliAQjdzNeWMYOjmw8")
        .update({ natal: [] });

      setDrawList(namesList);
      setConfirmDraw(false);
      setPick("");

      updateStatus(false);
    }
  };

  useEffect(() => {
    console.log("header");
  }, []);

  return (
    <React.Fragment>
      {started ? (
        <div className="header__draw-status">
          <span>
            ATENÇÃO: SORTEIO EM ANDAMENTO
            <Button
              disabled={!started}
              id="stop-draw"
              className="btn__cancel"
              onClick={() => stopDraw()}
              content={"Cancelar sorteio"}
            />
          </span>
        </div>
      ) : null}

      <h1>AMIGO SECRETO</h1>
      <h4>Natal 2020</h4>
    </React.Fragment>
  );
};

export default Registration;
