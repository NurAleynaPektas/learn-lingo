import css from "./Header.module.css";

export default function Header() {
  return (
    <header className={css.header}>
      <div className={css.logo}>LearnLingo</div>

      <nav className={css.nav}>
        <a href="#">Home</a>
        <a href="#">Teachers</a>
      </nav>

      <div className={css.actions}>
        <button className={css.login}>Log in</button>
        <button className={css.register}>Registration</button>
      </div>
    </header>
  );
}
