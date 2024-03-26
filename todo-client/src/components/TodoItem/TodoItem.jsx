import { useState } from "react";
import MoreInfo from "../MoreInfo/MoreInfo";
import "./ToDoItem.css";

export default function TodoItem({ task, updatePage }) {
  const [showMore, setShowMore] = useState(false);

  function openMore() {
    setShowMore(true);
  }

  function closeMore() {
    setShowMore(false);
  }

  async function taskDone() {
    const payload = {
      id: task.id,
      completed: !task.completed,
    };
    await sendData(payload);
    updatePage();
  }

  async function sendData(payload) {
    const url = "http://localhost:8080/v1/todo/update";
    const res = await fetch(url, {
      method: "PUT",
      withCredentials: true,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  }

  return (
    <>
      <li className="box-todo-item" onClick={openMore}>
        <div>
          <input
            className="todo-item-checkbox"
            type="checkbox"
            onChange={taskDone}
            onClick={(e) => e.stopPropagation()}
            defaultChecked={task.completed}
          />
          <a className="tasktitle">{task.title}</a>
        </div>
      </li>
      <MoreInfo
        task={task}
        visible={showMore}
        onClose={closeMore}
        updatePage={updatePage}
      />
    </>
  );
}
