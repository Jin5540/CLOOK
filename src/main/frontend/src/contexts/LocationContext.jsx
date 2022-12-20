import React, { createContext, useContext, useState } from "react";

const LocationContext = createContext();
const locaStorageLocation = "서울특별시 중구 명동";

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

  return (
    <LocationContext.Provider value={{ location, updateLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => useContext(LocationContext);
