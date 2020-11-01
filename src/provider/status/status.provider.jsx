import React, { createContext, useEffect, useState } from "react";
import { firestore } from "../../firebase/firebase.utils";

export const StatusContext = createContext({
  started: false,
  updateStatus: () => {},
});

const StatusProvider = ({ children }) => {
  const [started, setStarted] = useState(false);

  const getStatus = async () => {
    firestore.collection("status").onSnapshot((snapshot) => {
        snapshot.forEach(status => setStarted(status.data().natal))
    });
  };

  const updateStatus = async (status) => {
    await firestore
      .collection("status")
      .doc("Vaia0bykE4TWdMISIM0W")
      .update({ natal: status });

    getStatus();
  };

  useEffect(() => {
    getStatus()
    console.log("status")
  },[])

  return (
    <StatusContext.Provider
      value={{
        started,
        updateStatus,
      }}
    >
      {children}
    </StatusContext.Provider>
  );
};

export default StatusProvider;
