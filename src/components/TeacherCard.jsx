import { useState, useEffect } from "react";
import css from "./TeacherCard.module.css";
import iziToast from "izitoast";

export default function TeacherCard({ teacher }) {
  const [fav, setFav] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const updateFav = () => {
      const stored = JSON.parse(localStorage.getItem("favorites")) || [];
      setFav(stored.includes(teacher.id));
    };

    updateFav();

    window.addEventListener("favoritesChanged", updateFav);

    return () => {
      window.removeEventListener("favoritesChanged", updateFav);
    };
  }, [teacher.id]);

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
    let updated = [];

    if (stored.includes(teacher.id)) {
      updated = stored.filter((id) => id !== teacher.id);
    } else {
      updated = [...stored, teacher.id];
    }

    localStorage.setItem("favorites", JSON.stringify(updated));
    window.dispatchEvent(new Event("favoritesChanged"));
  };

  return (
    <div className={css.card}>
      <div className={css.top}>
        <img
          src={teacher.avatar_url}
          alt={`${teacher.name} ${teacher.surname}`}
          className={css.avatar}
        />

        <div className={css.info}>
          <p className={css.name}>
            {teacher.name} {teacher.surname}
          </p>
          <p className={css.lang}>{teacher.languages.join(", ")}</p>
        </div>

        <div className={css.right}>
          <span className={css.price}>{teacher.price_per_hour}$ / hour</span>

          <button
            type="button"
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

            {teacher.conditions && Array.isArray(teacher.conditions) && (
              <div className={css.conditions}>
                {teacher.conditions.map((condition, index) => (
                  <p key={index}>{condition}</p>
                ))}
              </div>
            )}

            {teacher.reviews && Array.isArray(teacher.reviews) && (
              <div className={css.reviews}>
                {teacher.reviews.map((r, i) => (
                  <div key={i} className={css.review}>
                    <strong>{r.reviewer_name}</strong>
                    {r.reviewer_rating && ` (${r.reviewer_rating}/5)`}:{" "}
                    {r.comment}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <button
        type="button"
        className={css.readMore}
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? "Show less" : "Read more"}
      </button>
    </div>
  );
}
