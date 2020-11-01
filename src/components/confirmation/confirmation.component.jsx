import React, { useContext, useEffect, useState } from "react";
import { firestore } from "../../firebase/firebase.utils";

import DrawContext from "../../context/draw/draw.context";
import Button from "../button/button.component";

const Confirmation = () => {
  const { drawList, drawnNames, setDrawnNames } = useContext(DrawContext);
  const [showDrawnList, setShowDrawnList] = useState(false);

  const getDrawnNames = async () => {
    firestore.collection("confirmationList").onSnapshot((snapshot) => {
      snapshot.forEach((list) => setDrawnNames(list.data().natal));
    });
  };

  useEffect(() => {
    getDrawnNames();
    console.log("confirmation");
  }, []);

  return drawnNames.length === 0 ? null : (
    <section className="confirmation">
      <Button
        content="Ver nomes sorteados"
        equalStarted={!showDrawnList && drawList.length === 0}
        onClick={() => {
          setShowDrawnList(true);
          getDrawnNames();
        }}
      />
      {showDrawnList && drawList.length === 0 ? (
        <div>
          <h2 className="confirmation__title">Nomes Sorteados</h2>

          {drawnNames.sort().map((name, key) => (
            <span key={key}>
              {key + 1} - {name}
            </span>
          ))}
        </div>
      ) : null}
    </section>
  );
};

export default Confirmation;
