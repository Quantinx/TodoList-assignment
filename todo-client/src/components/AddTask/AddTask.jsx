import React, { useState, useContext } from "react";
import { TaskProviderContext } from "../../provider/TaskProvider";
import styles from "./AddTask.module.css";

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
        className={styles.more__info}
        style={{
          visibility: visible ? "visible" : "hidden",
        }}
      >
        <h1>Create a new task:</h1>
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
        <button className={styles.info__addTaskBtn} onClick={onAdd}>
          save
        </button>{" "}
        <button className={styles.info__closeBtn} onClick={onClose}>
          cancel
        </button>
      </div>
    </>
  );
}
