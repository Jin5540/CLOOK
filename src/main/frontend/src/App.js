import React from "react";
import Header from "./components/Header/Header";
import Content from "./components/Shared/Content/Content";
import Footer from "./components/Footer/Footer";

export default function App() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-full">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}
