import MainHeaderBackground from '@/components/main-header/main-header-background';
import NavLink from './nav-link';
import Link from "next/link";
import Image from "next/image";
import LogoImg from "../../public/images/logo.png";
import classes from "./main-header.module.css";

export default function MainHeader() {

  return (
    <>
    <MainHeaderBackground />
    <header className={classes.header}>
      <Link href="/" className={classes.logo}>
        <Image src={LogoImg} 
        priority={true}
        quality={75}
        alt="A plate on food on it" />
        NextLevel Food
      </Link>

      <nav className={classes.nav}>
        <ul>
            <li>
              <NavLink href="/meals">Browse Meals</NavLink>
            </li>
            <li>
            <NavLink href="/community">Foodies Community</NavLink>
            </li>
        </ul>
      </nav>
    </header>
    </>
  );
}
