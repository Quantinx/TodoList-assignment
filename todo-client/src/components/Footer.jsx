import "./Footer.css";
import { IoLogoGithub } from "react-icons/io";

export default function Footer() {
  return (
    <footer className="footer">
      <h3 className="footer__title">
        Built during &quot;beyond endpoint&quot;
      </h3>
      <nav>
        <ul>
          <li className="footer__link">
            <a
              className="footer__box-link"
              href="https://github.com/Quantinx"
              target="blank"
            >
              <p className="footer__link-text">Joe Tassell</p>
              <IoLogoGithub className="footer__icon" />
            </a>
          </li>
          <li className="footer__link">
            <a
              className="footer__box-link"
              href="https://github.com/marianordqvist"
              target="blank"
            >
              <p className="footer__link-text">Maria Nordqvist</p>
              <IoLogoGithub className="footer__icon" />
            </a>
          </li>
          <li className="footer__link">
            <a
              className="footer__box-link"
              href="https://github.com/maryana-reznychenko"
              target="blank"
            >
              <p className="footer__link-text">Maryana Reznychenko</p>
              <IoLogoGithub className="footer__icon" />
            </a>
          </li>
          <li className="footer__link">
            <a
              className="footer__box-link"
              href="https://github.com/Wallenborg"
              target="blank"
            >
              <p className="footer__link-text">Niklas Wallenborg</p>
              <IoLogoGithub className="footer__icon" />
            </a>
          </li>
          <li className="footer__link">
            <a
              className="footer__box-link"
              href="https://github.com/vsafonova"
              target="blank"
            >
              <p className="footer__link-text">Viktoriia Safonova</p>
              <IoLogoGithub className="footer__icon" />
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
