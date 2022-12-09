import React, { createContext, useContext, useState } from "react";

const LocationContext = createContext();
const locaStorageLocation = "충청남도 아산시 모종동";

export const LocationProvider = ({ children }) => {
  // const [apiFlag, setApiFlag] = useState(false);
  const [location, setLocation] = useState(
    localStorage.getItem("location")
      ? localStorage.getItem("location")
      : locaStorageLocation
  );

  const updateLocation = (address) => {
    if (!address) address = locaStorageLocation;

    setLocation(address);
    localStorage.setItem("location", address);
  };

  // const updateApiFlag = (value) => {
  //   setApiFlag(value);
  // };

  return (
    <LocationContext.Provider
      // value={{ location, updateLocation, apiFlag, updateApiFlag }}
      value={{ location, updateLocation }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => useContext(LocationContext);
