import { useState, useEffect } from "react";
import css from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";

// FIREBASE
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const closeMenu = () => setOpen(false);

  useEffect(() => {
    const escClose = (e) => {
      if (e.key === "Escape") closeMenu();
    };

    document.addEventListener("keydown", escClose);
    return () => document.removeEventListener("keydown", escClose);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
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
  const handleLogout = async () => {
    await signOut(auth);
    closeMenu();
    navigate("/");
  };

  return (
    <>
      <header className={css.header}>
       <Link to="/" className={css.logo}> LearnLingo </Link>

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
            <div className={css.userBox}>
              <span className={css.username}>{user.displayName || "User"}</span>

              <button className={css.login} onClick={handleLogout}>
                Logout
              </button>
            </div>
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
