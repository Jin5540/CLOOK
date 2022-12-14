import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Error from "./components/Shared/Error/Error";
import { useLocationContext } from "./contexts/LocationContext";
import useLocation from "./hooks/useLocation";
import Header from "./components/Header/Header";
import Content from "./components/Shared/Content/Content";
import Footer from "./components/Footer/Footer";
import Skeleton from "./components/Shared/UI/Skeleton";

export default function App() {
  const { location, isSucc, updateSucc } = useLocationContext();
  const { locationQuery } = useLocation(location);
  const { isError, status, isSuccess } = locationQuery;
  useEffect(() => {
    if (status === "success") updateSucc(true);
  }, [locationQuery]);

  return (
    <ErrorBoundary FallbackComponent={Error}>
      <div className="flex flex-col items-center justify-center w-full min-h-full">
        <Header />
        {isSucc && <Content />}
        {!isSucc && <Skeleton />}
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
