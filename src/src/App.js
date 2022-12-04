import { useState } from "react";
import Header from "./components/Header/Header";
import Content from "./components/Shared/Content/Content";
import Footer from "./components/Footer/Footer";
import ModalContent from "./components/Modal/ModalContent";
import useLocation from "./hooks/useLocation";
// import Fetch from "./fetch";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState(
    localStorage.getItem("location")
      ? localStorage.getItem("location")
      : "충청남도 아산시 모종동"
  );

  const { locationQuery } = useLocation(location);
  const { isSuccess, error } = locationQuery;
  // console.log(isSuccess, error);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Header
        location={location}
        isOpen={isOpen}
        onOpenModal={() => setIsOpen(true)}
      />
      {error && <p>Somthing is wrong 😖</p>}
      {isSuccess && (
        <div className="flex flex-col items-center w-full overflow-hidden overflow-y-auto">
          <Content />
          <Footer />
          {isOpen && (
            <ModalContent
              onCloseModal={() => setIsOpen(false)}
              setLocation={setLocation}
            />
          )}
        </div>
      )}{" "}
      {/* <Fetch /> */}
    </div>
  );
}
