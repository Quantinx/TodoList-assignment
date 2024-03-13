import MoreButton from "../../components/MoreButton";
import User from "../../components/User";
import AddButton from "../../components/AddButton";
import Filter from "../../components/Filter";
import TodoItem from "../../components/TodoItem";

export default function TodoPage() {
  return (
    <>
      <User />
      <AddButton />
      <Filter />
      <main className="todo-list">
        <ul>
          {/* // javascript.map */}
          <TodoItem />
          {/* //end map */}
        </ul>
        <MoreButton />
      </main>
    </>
  );
}
