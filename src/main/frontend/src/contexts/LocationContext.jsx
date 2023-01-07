import React, { createContext, useContext, useState } from "react";

const LocationContext = createContext();
const locaStorageLocation = "서울특별시 중구 명동";
const locaStorageRegion = "명동";

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(
    localStorage.getItem("location") && localStorage.getItem("region")
      ? localStorage.getItem("location")
      : locaStorageLocation
  );
  const [region, setRegion] = useState(
    localStorage.getItem("location") && localStorage.getItem("region")
      ? localStorage.getItem("region")
      : locaStorageRegion
  );

  const updateLocation = (address, region) => {
    if (!address) address = locaStorageLocation;
    if (!region) region = locaStorageRegion;

    setLocation(address);
    setRegion(region);
    localStorage.setItem("location", address);
    localStorage.setItem("region", region);
  };

  return (
    <LocationContext.Provider value={{ location, region, updateLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => useContext(LocationContext);
