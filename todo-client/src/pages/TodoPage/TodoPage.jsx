import MoreButton from "../../components/MoreButton";
import User from "../../components/User";
import AddButton from "../../components/AddButton";
import Filter from "../../components/Filter";

export default function TodoPage() {
  return (
    <>
      <User />
      <AddButton />
      <Filter />
      <main className="todo-list">
        <ul>
          // javascript.map
          <TodoPage />
          //end map
        </ul>
        <MoreButton />
      </main>
    </>
  );
}
