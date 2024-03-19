import User from "../../components/User";
import Filter from "../../components/Filter";
import TodoItem from "../../components/TodoItem";
import { useContext, useState } from "react";
import { TaskProviderContext } from "../../provider/TaskProvider";
import AddTaskBtn from "../../components/AddTaskBtn";
import AddTask from "../../components/AddTask/AddTask";

const TODAY_FILTER = "today";
const TOMORROW_FILTER = "tommorow";
const WEEK_FILTER = "week";
const ALL_FILTER = "all";

export default function TodoPage() {
  let { taskItems } = useContext(TaskProviderContext);
  const [addTaskVisible, setTaskVisible] = useState(false);
  const [filter, setFilter] = useState(ALL_FILTER);

  const shouldFilter = [WEEK_FILTER, ALL_FILTER].includes(filter);
  if (shouldFilter)
    taskItems = [...taskItems].sort(
      (a, b) => new Date(a.duedate) - new Date(b.duedate)
    );

  function showAddTask() {
    setTaskVisible(true);
  }

  function hideAddTask() {
    setTaskVisible(false);
  }

  function handleFilterChange(event) {
    setFilter(event.target.value);
  }

  function getEndOfWeek() {
    const today = new Date();
    const daysUntilSunday = 8 - today.getDay();
    const endOfWeek = new Date(
      today.getTime() + daysUntilSunday * 24 * 60 * 60 * 1000
    );
    return endOfWeek;
  }

  const filteredTasks = taskItems.filter((task) => {
    const taskDate = new Date(task.duedate);
    if (filter === TODAY_FILTER) {
      const today = new Date();
      return taskDate.toDateString() === today.toDateString();
    } else if (filter === TOMORROW_FILTER) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return taskDate.toDateString() === tomorrow.toDateString();
    } else if (filter === WEEK_FILTER) {
      const endOfWeek = getEndOfWeek();
      return taskDate <= endOfWeek;
    }
    return true;
  });

  return (
    <div className="todo-container">
      <User />
      <div className="todo-container-top">
        <AddTaskBtn onClick={showAddTask} />
        <Filter onFilterChange={handleFilterChange} />
      </div>
      <main className="todo-list">
        {filteredTasks.length > 0 ? (
          <ul>
            {filteredTasks.map((task, index) => {
              let heading = null;
              if (filter === TODAY_FILTER && index === 0) {
                heading = <h2>Today</h2>;
              } else if (filter === TOMORROW_FILTER && index === 0) {
                heading = <h2>Tomorrow</h2>;
              } else if (filter === WEEK_FILTER && index === 0) {
                heading = <h2>This Week</h2>;
              }
              return (
                <div key={task.taskname}>
                  {heading}
                  <TodoItem task={task} />
                </div>
              );
            })}
          </ul>
        ) : (
          <div>No data found</div>
        )}
        <AddTask visible={addTaskVisible} onClose={hideAddTask} />
      </main>
    </div>
  );
}
