import { useState, createContext } from "react";
import { tasks } from "../testdata";
export const TaskProviderContext = createContext();
const data = tasks.slice(0, 5);

export const TaskProvider = ({ children }) => {
  const [taskItems, setTaskItems] = useState(data);

  function updateItem(id, title, desc, date, comp) {
    console.log("updateing item " + id);
    console.log(title, desc, date, comp);
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
  }

  const value = { taskItems, setTaskItems, updateItem };

  return (
    <TaskProviderContext.Provider value={value}>
      {children}
    </TaskProviderContext.Provider>
  );
};
