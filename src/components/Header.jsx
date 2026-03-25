import { useState, useEffect } from "react";
import css from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => setOpen(false);

  // ESC ile kapatma
  useEffect(() => {
    const escClose = (e) => {
      if (e.key === "Escape") closeMenu();
    };

    document.addEventListener("keydown", escClose);
    return () => document.removeEventListener("keydown", escClose);
  }, []);

  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem("user");
      setUser(!!storedUser);
    };

    checkUser();

    window.addEventListener("userChanged", checkUser);

    return () => window.removeEventListener("userChanged", checkUser);
  }, []);

  // LOGIN
  const goToLogin = () => {
    navigate("/login");
    closeMenu();
  };

  // REGISTER
  const goToRegister = () => {
    navigate("/register");
    closeMenu();
  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("userChanged"));
    closeMenu();
    navigate("/");
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

          {/* MOBILE MENU */}
          <div className={css.mobileActions}>
            {user ? (
              <button className={css.login} onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <>
                <button className={css.login} onClick={goToLogin}>
                  Log in
                </button>
                <button className={css.register} onClick={goToRegister}>
                  Registration
                </button>
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
              <button className={css.login} onClick={goToLogin}>
                Log in
              </button>
              <button className={css.register} onClick={goToRegister}>
                Registration
              </button>
            </>
          )}

          <button
            type="button"
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
