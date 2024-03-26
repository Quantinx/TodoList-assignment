import "./LogOutBtn.css";

export default function LogOutBtn({ onLogOut }) {
  return (
    <div className="logoutbtn-box">
      <button className="logoutbtn" onClick={onLogOut}>
        Logout
      </button>
    </div>
  );
}
