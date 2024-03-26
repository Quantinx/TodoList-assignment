import React, { useState } from "react";
import { convertLocaltimeStampToUTC } from "../../helpers/datetime";
import "./AddTask.css";

export default function AddTask({ visible, onClose, updatePage }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [addStatus, setAddStatus] = useState();
  const [response, setResponse] = useState();

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
    const url = "http://localhost:8080/v1/todo/add";
    const res = await fetch(url, {
      method: "POST",
      withCredentials: true,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    setAddStatus(res.status);
  }

  async function onAdd() {
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
    const timestamp = convertLocaltimeStampToUTC(date);
    const payload = { title: name, description: desc, dueDate: timestamp };
    await sendData(payload);
    onClose();
    updatePage();
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
        <h1>Create a new task:</h1>
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
          type="datetime-local"
          onChange={handleDateChange}
          placeholder="Due Date"
          required
        ></input>
        <div>{response}</div>
        <button className="info-save-btn" onClick={onAdd}>
          save
        </button>
      </div>
    </>
  );
}
