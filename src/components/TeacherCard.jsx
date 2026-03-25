import { useState, useEffect } from "react";
import css from "./TeacherCard.module.css";
import iziToast from "izitoast";

export default function TeacherCard({ teacher }) {
  const [fav, setFav] = useState(false);
  const [open, setOpen] = useState(false);

  // FAVORİYİ OKU
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFav(stored.includes(teacher.id));
  }, [teacher.id]);

  // FAVORİ TOGGLE
  const toggleFav = () => {
    const user = localStorage.getItem("user");

    if (!user) {
      iziToast.info({
        title: "Login required",
        message: "Please log in to use favorites",
        position: "topRight",
      });
      return;
    }

    const stored = JSON.parse(localStorage.getItem("favorites")) || [];

    let updated;

    if (stored.includes(teacher.id)) {
      updated = stored.filter((id) => id !== teacher.id);
      setFav(false);
    } else {
      updated = [...stored, teacher.id];
      setFav(true);
    }

    localStorage.setItem("favorites", JSON.stringify(updated));
  };

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
            onClick={toggleFav}
          >
            ♥
          </button>
        </div>
      </div>

      <div className={css.desc}>
        <p>{teacher.experience}</p>

        {open && (
          <>
            {teacher.lesson_info && <p>{teacher.lesson_info}</p>}
            {teacher.conditions && <p>{teacher.conditions}</p>}

            {teacher.reviews && (
              <div className={css.reviews}>
                {teacher.reviews.map((r, i) => (
                  <div key={i} className={css.review}>
                    <strong>{r.name}:</strong> {r.comment}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <button className={css.readMore} onClick={() => setOpen((prev) => !prev)}>
        {open ? "Show less" : "Read more"}
      </button>
    </div>
  );
}
