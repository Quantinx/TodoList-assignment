import { useState, createContext } from "react";
export const TaskProviderContext = createContext();

export const TaskProvider = ({ children }) => {
  const [taskItems, setTaskItems] = useState();
  const [loggedIn, setLoggedIn] = useState(false);

  function updateItem(id, title, desc, date, comp) {
    const updatedRow = taskItems.map((task) =>
      task.id === id
        ? {
            ...task,
            id,
            taskname: title,
            taskdesc: desc,
            duedate: date,
            completed: comp,
          }
        : task
    );
    setTaskItems(updatedRow);
    return "Task Saved Successfully";
  }

  function addItem(title, desc, date) {
    const newID = taskItems.length || 1;
    const data = {
      id: newID,
      taskname: title,
      taskdesc: desc,
      duedate: date,
      completed: false,
    };
    const newData = [...taskItems, data];
    setTaskItems(newData);
    return "Task added succesfully";
  }

  const value = {
    taskItems,
    setTaskItems,
    updateItem,
    addItem,
    loggedIn,
    setLoggedIn,
  };

  return (
    <TaskProviderContext.Provider value={value}>
      {children}
    </TaskProviderContext.Provider>
  );
};
