import Link from "next/link";
import LogoImg from "../public/images/logo.png";
import classes from "./main-header.module.css";

export default function MainHeader() {
  return (
    <header className={classes.header}>
      <Link href="/" className={classes.logo}>
        <img src={LogoImg.src} alt="A plate on food on it" />
        NextLevel Food
      </Link>

      <nav className={classes.nav}>
        <ul>
            <li>
                <Link href="/meals">Browse Meals</Link>
            </li>
            <li>
                <Link href="/community">Foodies Community</Link>
            </li>
        </ul>
      </nav>
    </header>
  );
}
