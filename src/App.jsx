import React, { useState } from "react";
import "./styles.css";

// タスクの完了機能より開始
export const App = () => {
  // todoテキスト内がはじめは空っぽ
  const [todoText, settodoText] = useState([""]);
  // incompleteの部分にデータを反映
  const [incompleteTodos, setincompleteTodos] = useState([
    "ああああ",
    "いいいい"
  ]);
  const [completeTodos, setcompleteTodos] = useState(["うううう"]);
  // 文字を入力したら、値を取得する
  const onChangetodoText = (event) => settodoText(event.target.value);

  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setincompleteTodos(newTodos);
  };

  // 追加を押したときのアクションを設定
  const onClickadd = () => {
    // 空白で追加を押した場合、追加作業を行わない
    if (todoText === "") return;
    // 入力した内容を新しく追加 配列形式で実施
    const newTodos = [...incompleteTodos, todoText];
    setincompleteTodos(newTodos);
    // 追加の部分にデータが残っているので、消去
    settodoText("");
  };
  return (
    <>
      {/* classNameを当てることで、CSSのスタイルを適用している */}
      <div className="input-area">
        {/* onChangeを使うことで、クリックするとonClickaddが走るように設定 */}
        <input
          placeholder="TODOを入力"
          value={todoText}
          onChange={onChangetodoText}
        />
        <button onClick={onClickadd}>追加</button>
      </div>
      <div className="incomplete-area">
        <p className="title">未完了のTODO</p>
        <ul>
          {/* mapを使う時、、バックで差分のみのレンダリングをしているため、keyを使って場所の設定が必要  */}
          {incompleteTodos.map((todo, index) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button>完了</button>
                <button onClick={() => onClickDelete(index)}>削除</button>
              </div>
            );
          })}
        </ul>
      </div>
      <div className="complete-area">
        <p className="title">完了のTODO</p>
        <ul>
          {completeTodos.map((todo) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button>戻す</button>
              </div>
            );
          })}
        </ul>
      </div>
      <div></div>
    </>
  );
};
