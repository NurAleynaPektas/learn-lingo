import { useState } from "react";
import css from "./TeacherCard.module.css";

export default function TeacherCard({ teacher }) {
  const [fav, setFav] = useState(false);

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

        <div className={css.right}>
          <span className={css.price}>{teacher.price_per_hour}$ / hour</span>

          <button
            className={`${css.heart} ${fav ? css.active : ""}`}
            onClick={() => setFav(!fav)}
          >
            ♥
          </button>
        </div>
      </div>

      <p className={css.desc}>{teacher.experience}</p>

      <button className={css.readMore}>Read more</button>
    </div>
  );
}
