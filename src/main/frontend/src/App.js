import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import Error from "./components/Shared/Error/Error";
import Header from "./components/Header/Header";
import Content from "./components/Shared/Content/Content";
import Footer from "./components/Footer/Footer";
import Survey from "./components/Shared/Survey/Survey";

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={Error}>
      <div className="relative flex flex-col items-center w-full min-h-full bg-white">
        <Header />
        <Content />
        <Footer />
        <Survey />
      </div>
    </ErrorBoundary>
  );
}
