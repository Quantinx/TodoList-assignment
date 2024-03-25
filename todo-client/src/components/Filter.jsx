export default function Filter() {
  return (
    <div className="filter">
      <select className="filter-select" defaultValue="all">
        <option value="today">Today</option>
        <option value="tommorow">Tomorrow</option>
        <option value="week">Next 7 Days</option>
        <option value="all">All</option>
      </select>
    </div>
  );
}
