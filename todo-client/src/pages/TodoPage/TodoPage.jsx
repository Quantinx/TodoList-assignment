import MoreButton from "../../components/MoreButton";
import User from "../../components/User";
import AddButton from "../../components/AddButton";
import Filter from "../../components/Filter";
import TodoItem from "../../components/TodoItem";
import { useContext } from "react";
import { TaskProviderContext } from "../../provider/TaskProvider";

export default function TodoPage() {
  const { taskItems } = useContext(TaskProviderContext);
  console.log(taskItems);
  return (
    <>
      <User />
      <AddButton />
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
      </main>
    </>
  );
}
