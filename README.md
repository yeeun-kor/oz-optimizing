# React Optimizing Performance 성능최적화

> ## 목차

## 리액트의 함수 최적화 필요성

함수 컴포넌트를 한번 만들어두면, 상태가 변경이 될 때마다 화면이 계속 랜더링 됨.
이전의 호출했던 함수는 더이상 사용하지 않고,
새로운 상태값으로 함수 호출
이로 인하여 랜더링이 계속 발생함!

### 함수를 새롭게 호출한다?

함수 내부의 변수,함수들이 모두 **새로 선언되고 새로 할당**이 된다는 뜻
즉, **재사용을 가능한 함수들도** 불필요하게 새로 생성한다는 뜻.

> 이로인해 비효율적 메모리 낭비 발생
>
> #### 해결방안 : 함수를 저장 + 재사용

## 최적화 방법 3가지

> - **useMemo() 함수**
> - **useCallback() 함수**
> - **memo() 함수**

1. useMemo() : 함수 호출 결과를 (?)에 저장하는 함수
2. useCallback() : 함수를 (?)에 저장
3. memo() : 컴포넌트를 (?) 에 저장

---

### 1.useMemo()

함수 호출시 전해주는 **인자값이 동일하다면**, 굳이 새로 만들지 않고 동일한값을 반환 하겠다!
이전에 계산된 값을 기억하고, 해당 값이 변경되지 않으면 이전에 계산된 값을 재사용한다.
아래 참고 스샷을 보게 되면, '랜더링' 이라는 버튼을 전혀 '더하기' 버튼과는 전혀 상관이 없는데도 , 상태가 바뀌면서
`App` **함수 컴포넌트가 리랜더링 되니깐,** '랜더링' 도 함께 랜더링이 되는 현상이 나타난다.

![alt text](useMemo사용전.gif)

#### 사용방법

```jsx
const 저장할결과값 = useMemo(()=>{
return 함수코드;
}.[값])

  //useMemo()함수 아용해서 값 저장하기
  const numPlus01 = useMemo(() => {
    return plus01(num);
  }, [num]);

```

- 이 함수를 호출 했을 때의, `[값]`이 변하지 않으면 이 함수를 다시 호출 하지 않음
- 예를들어, `numPlus01` 의 값은 어떠한 이벤트 효과로 `[num]` 값이 바뀌면 `plus01(num)` 함수를 실행하겠다.

```jsx
import { useMemo } from "react";
function TodoList({ todosList, activeTab }) {
  // filteredTodos 함수를 호출하여 현재 선택된 탭에 해당하는 할 일 목록을 가져와서 캐시
  const filteredTodos = useMemo(
    () => filterTodos(todosList, activeTab),
    //
    [todosList, activeTab] // todosList와 activeTab이 변경될 때마다 filteredTodos 값을 다시 계산
  );
  // ...
}
```

---

### 2. useCallback() ⭐️함수 자체를⭐️저장

리액트 내에서 함수를 선언하면, 매 렌더링될 때마다 **해당 함수는 새로 생성**됩니다.
이는 부모 컴포넌트에서 `props가` 변경되거나, 상태(`state`)가 변경될 때마다 자식 컴포넌트가 불필요하게 다시 렌더링 되는 번거로운 작업의 원인이 된다.

#### 사용법
```jsx
const 저장할함수 = useCallback(() => {
  return 함수코드;
}, [값]);
```

---

### 3. React.memo()
