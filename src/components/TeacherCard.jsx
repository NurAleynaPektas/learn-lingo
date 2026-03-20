import css from "./TeacherCard.module.css";

export default function TeacherCard({ teacher }) {
  return (
    <div className={css.card}>
      <div className={css.top}>
        <div className={css.avatar}></div>

        <div className={css.info}>
          <p className={css.name}>
            {teacher.name} {teacher.surname}
          </p>
          <p className={css.lang}>{teacher.languages.join(", ")}</p>
        </div>

        <div className={css.price}>{teacher.price_per_hour}$ / hour</div>
      </div>

      <p className={css.desc}>{teacher.experience}</p>

      <button className={css.readMore}>Read more</button>
    </div>
  );
}
