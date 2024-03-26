import User from "../../components/User";
import Filter from "../../components/Filter";
import TodoItem from "../../components/TodoItem";
import { useContext, useState } from "react";
import { TaskProviderContext } from "../../provider/TaskProvider";
import AddTaskBtn from "../../components/AddTaskBtn";
import AddTask from "../../components/AddTask/AddTask";
import styles from "./TodoPage.module.css";
import { useEffect } from "react";
import { set } from "react-hook-form";

export default function TodoPage() {
  const { taskItems, setTaskItems, loggedIn } = useContext(TaskProviderContext);
  const [addTaskVisible, setTaskVisible] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const payload = {
      filter: "all",
      page: page,
    };

    sendData(payload);

    async function sendData(payload) {
      const url = "http://localhost:8080/v1/todo/filter";
      const res = await fetch(url, {
        method: "POST",
        withCredentials: true,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      console.log(data);
      setTaskItems(data);
    }
  }, []);

  function showAddTask() {
    setTaskVisible(true);
  }

  function hideAddTask() {
    setTaskVisible(false);
  }

  return (
    <div>
      <main className={styles.todo__container}>
        <User />
        <h1>Your planning:</h1>
        <div className={styles.todo__header}>
          <AddTaskBtn onClick={showAddTask} />
          <Filter />
        </div>

        <div className={styles.todo__list}>
          {taskItems ? (
            <ul>
              {taskItems.map((task) => {
                return <TodoItem task={task} key={task.id} />;
              })}
            </ul>
          ) : (
            <div>No data found</div>
          )}
          <AddTask visible={addTaskVisible} onClose={hideAddTask} />
        </div>
      </main>
    </div>
  );
}
