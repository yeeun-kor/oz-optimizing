import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";

const App = () => {
  const [num, setNum] = useState(5);
  const [render, setRender] = useState(false); //상태플래그

  //+1 함수 -> useCallback으로 저장함 -> num상태값이 바뀔 때마다 호출 됨.
  const plus01 = useCallback((num) => {
    console.log("plus01작성됨!");
    return num + 1;
  }, []);

  //useMemo()함수 아용해서 값 저장하기
  const numPlus01 = useMemo(() => {
    return plus01(num);
  }, [num]);

  //plus01 함수 화면 랜더링 확인해보기
  useEffect(() => {
    return console.log("plus01함수 생성됨");
  }, [plus01]);
  return (
    <div className="app-wrapper">
      <h2>useMemo : 함수의 결과값을 저장하는 곳 </h2>
      <div>numPlus한 결과 값 : {numPlus01}</div>
      <button onClick={() => setNum(num + 1)}>더하기</button>
      <button onClick={() => setRender(!render)}>리랜더</button>
    </div>
  );
};

export default App;
