import "./LoadMoreTasksButton.css";

export default function LoadMoreTasksButton({ onClick }) {
  return (
    <button onClick={onClick} className="load-more-tasks-button">
      Load more
    </button>
  );
}
