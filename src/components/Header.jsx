import { useState, useEffect } from "react";
import css from "./Header.module.css";

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
          <a href="#">Home</a>
          <a href="#">Teachers</a>

          <div className={css.mobileActions}>
            <button className={css.login}>Log in</button>
            <button className={css.register}>Registration</button>
          </div>
        </nav>

        <div className={css.actions}>
          <button className={css.login}>Log in</button>
          <button className={css.register}>Registration</button>

          <button className={css.hamburger} onClick={() => setOpen(!open)}>
            ☰
          </button>
        </div>
      </header>

      {open && <div className={css.backdrop} onClick={closeMenu}></div>}
    </>
  );
}
