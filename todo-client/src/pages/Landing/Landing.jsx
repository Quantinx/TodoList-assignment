import { Link } from "react-router-dom";
import styles from "./Landing.module.css";

function Landing() {
  return (
    <div>
      <main className={styles.landing}>
        <h1>A simple ToDo list to manage daily routine.</h1>
        <h2>You are always ready to plan the day!</h2>
        <nav className={styles.landing__BtnContainer}>
          <Link to="/login">
            <button className={styles.landing__BtnLogin}>log in</button>
          </Link>
          <Link to="/register">
            <button className={styles.landing__BtnCreate}>
              create an account
            </button>
          </Link>
        </nav>
      </main>
    </div>
  );
}

export default Landing;
