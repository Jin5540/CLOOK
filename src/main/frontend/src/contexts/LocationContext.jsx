import React, { createContext, useContext, useEffect, useState } from "react";
import useLocation from "../hooks/useLocation";

const LocationContext = createContext();
const locaStorageLocation = "충청남도 아산시 모종동";

export const LocationProvider = ({ children }) => {
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
  console.log("context");

  return (
    <LocationContext.Provider value={{ location, updateLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => useContext(LocationContext);
