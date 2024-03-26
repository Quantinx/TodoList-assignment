import "./LoadMoreTasksButton.css";

export default function LoadMoreTasksButton({ onClick }) {
  return (
    <button className="load-more-tasks-button" onClick={onClick}>
      Load more
    </button>
  );
}
