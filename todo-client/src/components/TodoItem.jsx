import { useState } from "react";
import MoreInfo from "./MoreInfo/MoreInfo";

export default function TodoItem({ task }) {
  const [showMore, setShowMore] = useState(false);

  function openMore() {
    setShowMore(true);
    console.log("element clicked");
  }

  function closeMore() {
    setShowMore(false);
  }

  return (
    <>
      <li className="todo-item" onClick={openMore}>
        <div>
          <input type="checkbox" defaultChecked={task.completed} />
          <a>{task.taskname}</a>
        </div>
      </li>
      <MoreInfo task={task} visible={showMore} onClose={closeMore} />
    </>
  );
}
