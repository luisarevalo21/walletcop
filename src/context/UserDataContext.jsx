import React, { createContext, useState, useContext } from "react";

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [hasSavedUserData, setHasSavedUserData] = useState(false);

  return (
    <UserDataContext.Provider value={{ hasSavedUserData, setHasSavedUserData }}>{children}</UserDataContext.Provider>
  );
};

export const useUserData = () => useContext(UserDataContext);
