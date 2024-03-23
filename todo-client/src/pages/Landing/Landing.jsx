import { Link } from "react-router-dom";
import styles from "./Landing.module.css";

function Landing() {
  return (
    <div>
      <main className={styles.landing}>
        <nav className={styles.landingBtnContainer}>
          <Link to="/login">
            <button className={styles.landingBtnLogin}>Log In</button>
          </Link>
          <Link to="/register">
            <button className={styles.landingBtnCreate}>
              Create an Account
            </button>
          </Link>
        </nav>
      </main>
    </div>
  );
}

export default Landing;
