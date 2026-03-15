import { useState, useEffect } from "react";
import css from "./Header.module.css";
import { Link } from "react-router-dom";
export default function Header() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  useEffect(() => {
    const escClose = (e) => {
      if (e.key === "Escape") closeMenu();
    };

    document.addEventListener("keydown", escClose);
    return () => document.removeEventListener("keydown", escClose);
  }, []);

  return (
    <>
      <header className={css.header}>
        <div className={css.logo}>LearnLingo</div>

        <nav className={`${css.nav} ${open ? css.open : ""}`}>
          <Link to="/">Home</Link>
          <Link to="/teachers">Teachers</Link>

          <div className={css.mobileActions}>
            <button className={css.login}>LOG IN</button>
            <button className={css.register}>REGISTRATION</button>
          </div>
        </nav>

        <div className={css.actions}>
          <button className={css.login}>LOG IN</button>
          <button className={css.register}>REGISTRATION</button>

          <button className={css.hamburger} onClick={() => setOpen(!open)}>
            ☰
          </button>
        </div>
      </header>

      {open && <div className={css.backdrop} onClick={closeMenu}></div>}
    </>
  );
}
