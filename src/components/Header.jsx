import { useState, useEffect } from "react";
import css from "./Header.module.css";
import { Link } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  const closeMenu = () => setOpen(false);

  // ESC ile kapatma
  useEffect(() => {
    const escClose = (e) => {
      if (e.key === "Escape") closeMenu();
    };

    document.addEventListener("keydown", escClose);
    return () => document.removeEventListener("keydown", escClose);
  }, []);

  // sayfa açılınca user kontrol
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(true);
    }
  }, []);

  // login
  const handleLogin = () => {
    localStorage.setItem("user", "true");
    setUser(true);
  };

  // logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <>
      <header className={css.header}>
        <div className={css.logo}>LearnLingo</div>

        <nav className={`${css.nav} ${open ? css.open : ""}`}>
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>
          <Link to="/teachers" onClick={closeMenu}>
            Teachers
          </Link>
          <Link to="/favorites" onClick={closeMenu}>
            Favorites
          </Link>

          {/* MOBILE MENU ACTIONS */}
          <div className={css.mobileActions}>
            {user ? (
              <button className={css.login} onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <>
                <button className={css.login} onClick={handleLogin}>
                  Log in
                </button>
                <button className={css.register}>Registration</button>
              </>
            )}
          </div>
        </nav>

        <div className={css.actions}>
          {user ? (
            <button className={css.login} onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <button className={css.login} onClick={handleLogin}>
                Log in
              </button>
              <button className={css.register}>Registration</button>
            </>
          )}

          <button
            className={css.hamburger}
            onClick={() => setOpen((prev) => !prev)}
          >
            ☰
          </button>
        </div>
      </header>

      {open && <div className={css.backdrop} onClick={closeMenu}></div>}
    </>
  );
}
