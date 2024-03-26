import { useState, useContext } from "react";
import { TaskProviderContext } from "../../provider/TaskProvider";
import {
  convertLocaltimeStampToUTC,
  convertTimestampToDatetimeLocal,
} from "../../helpers/datetime";

export default function MoreInfo({ task, visible, onClose }) {
  const localtimestamp = convertTimestampToDatetimeLocal(task.due_date);
  const [name, setName] = useState(task.title);
  const [desc, setDesc] = useState(task.description);
  const [date, setDate] = useState(localtimestamp);
  const [response, setResponse] = useState();
  const [updateStatus, setUpdateStatus] = useState();
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
    setUpdateStatus(res.status);
  }

  async function deleteData(payload) {
    const url = "http://localhost:8080/v1/todo/delete";
    const res = await fetch(url, {
      method: "DELETE",
      withCredentials: true,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    setUpdateStatus(res.status);
  }
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

    const timestamp = convertLocaltimeStampToUTC(date);
    const payload = {
      id: task.id,
      title: name,
      description: desc,
      dueDate: timestamp,
    };
    sendData(payload);
  }

  function deleteTask() {
    const payload = { id: task.id };
    deleteData(payload);
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
        <button onClick={deleteTask}>Delete</button>
      </div>
    </>
  );
}
