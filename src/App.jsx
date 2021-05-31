import React, { useState } from "react";
import "./styles.css";
// importでそれぞれのファイルの定数を読み込み

import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";

export const App = () => {
  // 各領域のデータをセット
  const [todoText, setTodoText] = useState([]);
  const [incompleteTodos, setinCompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  // 文字を入力したら、値を取得する
  const onChangetodoText = (event) => setTodoText(event.target.value);

  // 追加を押したときのアクションを設定
  const onClickadd = () => {
    // 空白で追加を押した場合、追加作業を行わない
    if (todoText === "") return;
    // 入力した内容を新しく追加 配列形式で実施
    const newTodos = [...incompleteTodos, todoText];
    setinCompleteTodos(newTodos);
    // 追加の部分にデータが残っているので、消去
    setTodoText("");
  };

  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    // newTodosに入れた配列のindexを取り除いてタスクから削除する
    newTodos.splice(index, 1);
    setinCompleteTodos(newTodos);
  };

  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);

    // 完了を押したらnewCompleteへ追加
    // 未完成にあるimCompleteのデータを再編集
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setinCompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  // 戻るを押した場合の処理を実施
  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);

    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setCompleteTodos(newCompleteTodos);
    setinCompleteTodos(newIncompleteTodos);
  };
  //ボタン操作の後、各ファイルにデータを送る
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
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
