import React, { createContext, useContext, useState } from "react";

const LocationContext = createContext();
const locaStorageLocation = "충청남도 아산시 모종동";

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(
    localStorage.getItem("location")
      ? localStorage.getItem("location")
      : locaStorageLocation
  );
  const [isSucc, setIsSucc] = useState(false);

  const updateLocation = (address) => {
    if (!address) address = locaStorageLocation;

    setLocation(address);
    localStorage.setItem("location", address);
  };

  const updateSucc = (value) => {
    setIsSucc(value);
  };

  return (
    <LocationContext.Provider
      value={{ location, updateLocation, isSucc, updateSucc }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => useContext(LocationContext);
