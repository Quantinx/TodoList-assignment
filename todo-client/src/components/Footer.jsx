import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <h3 className="footer__title">Meet Taskify Creators</h3>
      <nav className="footer__name-box">
        <a href="https://github.com/Quantinx" target="blank">
          <p className="footer__link-text">Joe,</p>
        </a>
        <a
          className="footer__name-link"
          href="https://github.com/marianordqvist"
          target="blank"
        >
          <p className="footer__link-text">Maria,</p>
        </a>
        <a
          className="footer__name-link"
          href="https://github.com/maryana-reznychenko"
          target="blank"
        >
          <p className="footer__link-text">Maryana,</p>
        </a>
        <a
          className="footer__name-link"
          href="https://github.com/Wallenborg"
          target="blank"
        >
          <p className="footer__link-text">Niklas,</p>
        </a>
        <a
          className="footer__name-link"
          href="https://github.com/vsafonova"
          target="blank"
        >
          <p className="footer__link-text">Viktoriia</p>
        </a>
      </nav>
    </footer>
  );
}
