import React, { useState } from "react";
import "./styles.css";
// InputTodoからでimportを実行

import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
// コンポーネント化より開始
// 変数名をキャメルケースへ
export const App = () => {
  // todoテキスト内がはじめは空っぽ
  const [todoText, setTodoText] = useState([""]);
  // incompleteの部分にデータを反映
  const [incompleteTodos, setnCompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);
  // 文字を入力したら、値を取得する
  const onChangetodoText = (event) => setTodoText(event.target.value);

  // 追加を押したときのアクションを設定
  const onClickadd = () => {
    // 空白で追加を押した場合、追加作業を行わない
    if (todoText === "") return;
    // 入力した内容を新しく追加 配列形式で実施
    const newTodos = [...incompleteTodos, todoText];
    setnCompleteTodos(newTodos);
    // 追加の部分にデータが残っているので、消去
    setTodoText("");
  };

  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setnCompleteTodos(newTodos);
  };

  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);

    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setnCompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);

    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setCompleteTodos(newCompleteTodos);
    setnCompleteTodos(newIncompleteTodos);
  };
  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangetodoText}
        onClick={onClickadd}
      />
      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />

      <div className="complete-area">
        <p className="title">完了のTODO</p>
        <ul>
          {completeTodos.map((todo, index) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickBack(index)}>戻す</button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};
