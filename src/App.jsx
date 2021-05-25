import React, { useState } from "react";
import "./styles.css";

// タスクの削除より開始
// 変数名をキャメルケースへ
export const App = () => {
  // todoテキスト内がはじめは空っぽ
  const [todoText, setTodoText] = useState([""]);
  // incompleteの部分にデータを反映
  const [inCompleteTodos, setinCompleteTodos] = useState([
    "ああああ",
    "いいいい"
  ]);
  const [completeTodos, setCompleteTodos] = useState(["うううう"]);
  // 文字を入力したら、値を取得する
  const onChangetodoText = (event) => setTodoText(event.target.value);

  // 追加を押したときのアクションを設定
  const onClickadd = () => {
    // 空白で追加を押した場合、追加作業を行わない
    if (todoText === "") return;
    // 入力した内容を新しく追加 配列形式で実施
    const newTodos = [...inCompleteTodos, todoText];
    setinCompleteTodos(newTodos);
    // 追加の部分にデータが残っているので、消去
    setTodoText("");
  };

  const onClickDelete = (index) => {
    const newTodos = [...inCompleteTodos];
    newTodos.splice(index, 1);
    setinCompleteTodos(newTodos);
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
          {inCompleteTodos.map((todo, index) => {
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
    </>
  );
};
