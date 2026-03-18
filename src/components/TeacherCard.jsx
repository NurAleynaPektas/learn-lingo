import css from "./TeacherCard.module.css";

export default function TeacherCard() {
  return (
    <div className={css.card}>
      <div className={css.top}>
        <div className={css.avatar}></div>

        <div className={css.info}>
          <p className={css.name}>John Doe</p>
          <p className={css.lang}>English</p>
        </div>

        <div className={css.price}>30$ / hour</div>
      </div>

      <p className={css.desc}>
        Experienced teacher with 5 years of teaching practice.
      </p>

      <button className={css.readMore}>Read more</button>
    </div>
  );
}
