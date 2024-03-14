import React, { useState, useContext } from "react";
import { TaskProviderContext } from "../../provider/TaskProvider";
import "./MoreInfo.css";

export default function MoreInfo({ task, visible, onClose }) {
  const [name, setName] = useState(task.taskname);
  const [desc, setDesc] = useState(task.taskdesc);
  const [date, setDate] = useState(task.duedate);
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
    updateItem(task.id, name, desc, date, task.completed);
  }

  return (
    <>
      <div
        className="more-info"
        style={{
          visibility: visible ? "visible" : "hidden",
        }}
      >
        <button className="info-close-btn" onClick={onClose}>
          X
        </button>
        <input
          className="info-name-input"
          value={name}
          onChange={handleNameChange}
          placeholder="Task Name"
        ></input>
        <input
          className="info-desc-input"
          value={desc}
          onChange={handleDescChange}
          placeholder="Task Description"
        ></input>
        <input
          value={date}
          type="date"
          onChange={handleDateChange}
          placeholder="Due Date"
        ></input>

        <button onClick={onSave}>Save</button>
        <button>Delete</button>
      </div>
    </>
  );
}
