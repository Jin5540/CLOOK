import { useEffect } from "react";

export default function useModalOutSideClick(ref, callback) {
  // ref로 지정한 요소의 밖을 클릭 시 callback 함수를 실행
  useEffect(() => {
    const handleClick = (e) => {
      // ref를 가진 요소를 생성했다면 true (모달창 열리면 true)
      // 현재 handleClick 이벤트를 실행한 요소가 ref에 포함되면 내부 클릭
      // 포함되지 않으면 외부 클릭이기 때문에
      // 포함되지 않는 요소(=false)가 클릭되면 !(느낌표)로 인해 true로 반환된다.
      // => ref를 가진 요소가 생성되었고, 외부 클릭이 되었을 때 실행
      if (ref.current && !ref.current.contains(e.target)) {
        if (!callback) return;
        callback();
      }
    };

    window.addEventListener("mousedown", handleClick);

    return () => window.removeEventListener("mousedown", handleClick);
  }, [ref, callback]);
}
