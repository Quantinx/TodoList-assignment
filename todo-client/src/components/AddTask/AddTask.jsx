import React, { useState, useContext } from "react";
import { TaskProviderContext } from "../../provider/TaskProvider";

export default function AddTask({ visible, onClose }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [response, setResponse] = useState();
  const { addItem } = useContext(TaskProviderContext);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescChange = (e) => {
    setDesc(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  function onAdd() {
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

    submit();

    const res = addItem(name, desc, date);
    setResponse(res);
    onClose();
  }

  function submit() {
    setName("");
    setDesc("");
    setDate("");
    setResponse("");
  }

  return (
    <>
      <div
        className="more-info"
        style={{
          visibility: visible ? "visible" : "hidden",
        }}
      >
        <h3>Add new task</h3>
        <button className="info-close-btn" onClick={onClose}>
          x
        </button>
        <input
          type="text"
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
          type="date"
          onChange={handleDateChange}
          placeholder="Due Date"
        ></input>

        <div>{response}</div>
        <button onClick={onAdd}>Add new task</button>
      </div>
    </>
  );
}
