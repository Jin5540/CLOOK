import React from "react";
import NotFound from "./NotFound";

export default function Error({ error, resetErrorBoundary }) {
  console.log(error);
  const status = error.response?.status;
  const message = error.message && error.message;

  return (
    <div>
      {/* {console.dir(error)} */}
      {/* <button onClick={resetErrorBoundary}>Try again</button> */}
      <h1>{message}</h1>
      {status === 500 && <NotFound />}
    </div>
  );
}
