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
      {status === 400 && (
        <div>
          400 에러
          <br />
          잘못된 요청 - Client Error!
        </div>
      )}
      {status === 404 && (
        <div>
          404 에러
          <br />
          페이지를 찾을 수 없습니다.
        </div>
      )}
      {status === 405 && (
        <div>
          405 에러
          <br />
          Method not allowed - Client Error!
        </div>
      )}
      {status === 415 && (
        <div>
          415 에러
          <br />
          잘못된 형식으로 요청 서버 승인 거부 - Client Error!
        </div>
      )}
      {status === 500 && <NotFound />}
      {status === 505 && (
        <div>
          505 에러
          <br />
          HTTP Version Not Supported!
        </div>
      )}
    </div>
  );
}
