import MoreButton from "../../components/MoreButton";
import User from "../../components/User";
import Filter from "../../components/Filter";
import TodoItem from "../../components/TodoItem";
import { useContext, useState } from "react";
import { TaskProviderContext } from "../../provider/TaskProvider";
import AddTaskBtn from "../../components/AddTaskBtn";
import AddTask from "../../components/AddTask/AddTask";
export default function TodoPage() {
  const { taskItems } = useContext(TaskProviderContext);
  console.log(taskItems);

  const [addTaskVisible, setTaskVisible] = useState(false);
  console.log(taskItems);

  function showAddTask() {
    setTaskVisible(true);
  }

  function hideAddTask() {
    setTaskVisible(false);
  }
  return (
    <>
      <User />
      <AddTaskBtn onClick={showAddTask} />
      <Filter />
      <main className="todo-list">
        {taskItems ? (
          <ul>
            {taskItems.map((task, i) => {
              return <TodoItem task={task} key={i} />;
            })}
          </ul>
        ) : (
          <div>No data found</div>
        )}
        <MoreButton />
        <AddTask visible={addTaskVisible} onClose={hideAddTask} />
      </main>
    </>
  );
}
