import { useState, useContext } from "react";
import { TaskProviderContext } from "../../provider/TaskProvider";
import {
  convertLocaltimeStampToUTC,
  convertTimestampToDatetimeLocal,
} from "../../helpers/datetime";

export default function MoreInfo({ task, visible, onClose }) {
  const localtimestamp = convertTimestampToDatetimeLocal(task.due_date);
  console.log(task.due_date + " RAW");
  console.log(convertLocaltimeStampToUTC(localtimestamp) + " PROCESSED");
  const [name, setName] = useState(task.title);
  const [desc, setDesc] = useState(task.description);
  const [date, setDate] = useState(localtimestamp);
  const [response, setResponse] = useState();
  const { updateItem } = useContext(TaskProviderContext);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescChange = (e) => {
    setDesc(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  function onSave() {
    if (name === "") {
      setResponse("Please enter a task name");
      return;
    }
    if (desc === "") {
      setResponse("Please enter a task description");
      return;
    }

    if (date === "") {
      setResponse("Please enter a date");
      return;
    }

    const res = updateItem(task.id, name, desc, date, task.completed);
    setResponse(res);
  }

  return (
    <>
      <div
        className="more-info"
        style={{
          visibility: visible ? "visible" : "hidden",
        }}
      >
        <h3>Manage Task</h3>
        <button className="info-close-btn" onClick={onClose}>
          X
        </button>
        <input
          className="info-name-input"
          value={name}
          onChange={handleNameChange}
          placeholder="Task Name"
        ></input>
        <textarea
          className="info-desc-input"
          value={desc}
          onChange={handleDescChange}
          placeholder="Task Description"
        ></textarea>
        <input
          value={date}
          type="datetime-local"
          onChange={handleDateChange}
          placeholder="Due Date"
        ></input>
        <div> {response}</div>
        <button onClick={onSave}>Save</button>
        <button>Delete</button>
      </div>
    </>
  );
}
