import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import Error from "./components/Shared/Error/Error";
import Header from "./components/Header/Header";
import Content from "./components/Shared/Content/Content";
import Footer from "./components/Footer/Footer";

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={Error}>
      <div className="flex flex-col items-center justify-center w-full min-h-full">
        <Header />
        <Content />
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
