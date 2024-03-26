import Filter from "../../components/Filter";
import TodoItem from "../../components/TodoItem/TodoItem";
import { useContext, useState } from "react";
import { TaskProviderContext } from "../../provider/TaskProvider";
import AddTaskBtn from "../../components/Buttons/AddTaskBtn";
import AddTask from "../../components/AddTask/AddTask";
import LogOutBtn from "../../components/Buttons/LogOutBtn";
import styles from "./TodoPage.module.css";
import { useEffect } from "react";
import LoadMoreTasksButton from "../../components/Buttons/LoadMoreTasksButton";

export default function TodoPage() {
  const { taskItems, setTaskItems, setLoggedIn } =
    useContext(TaskProviderContext);
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
      setTaskItems(data);
    }
  }, []);

  async function loadMoreData(payload) {
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
    return data;
  }

  function showAddTask() {
    setTaskVisible(true);
  }

  function hideAddTask() {
    setTaskVisible(false);
  }

  async function loadMore() {
    const payload = {
      filter: "all",
      page: page + 1,
    };

    const data = await loadMoreData(payload);
    if (data.length) {
      const oldTasks = taskItems;
      const updatedTasks = oldTasks.concat(data);
      setTaskItems(updatedTasks);
    }
    setPage(page + 1);
  }

  async function logOut() {
    const url = "http://localhost:8080/logout";
    const res = await fetch(url, {
      method: "POST",
      withCredentials: true,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setLoggedIn(false);
  }

  async function updatePage() {
    const payload = { page: 1 };
    const items = await loadMoreData(payload);
    setTaskItems(items);
    setPage(1);
  }

  return (
    <div>
      <LogOutBtn onLogOut={logOut} />
      <main className={styles.todo__container}>
        <h1>Your planning:</h1>
        <div className={styles.todo__header}>
          <AddTaskBtn onClick={showAddTask} />
          <Filter />
        </div>
        <div className={styles.todo__list}>
          {taskItems ? (
            <ul>
              {taskItems.map((task) => {
                return (
                  <TodoItem task={task} key={task.id} updatePage={updatePage} />
                );
              })}
            </ul>
          ) : (
            <div>No data found</div>
          )}
          <AddTask
            visible={addTaskVisible}
            onClose={hideAddTask}
            updatePage={updatePage}
          />
        </div>
        <LoadMoreTasksButton onClick={loadMore} />
      </main>
    </div>
  );
}
