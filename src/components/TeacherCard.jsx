import { useState, useEffect } from "react";
import css from "./TeacherCard.module.css";
import iziToast from "izitoast";
import { auth } from "../firebase";

export default function TeacherCard({ teacher }) {
  const [fav, setFav] = useState(false);
  const [open, setOpen] = useState(false);

  const teacherId = teacher.name + teacher.surname;

  // FAVORITE DURUMU OKU
  useEffect(() => {
    const updateFav = () => {
      const user = auth.currentUser;

      if (!user) {
        setFav(false);
        return;
      }

      const key = `favorites_${user.uid}`;
      const stored = JSON.parse(localStorage.getItem(key)) || [];

      setFav(stored.includes(teacherId));
    };

    updateFav();

    window.addEventListener("favoritesChanged", updateFav);

    return () => {
      window.removeEventListener("favoritesChanged", updateFav);
    };
  }, [teacherId]);

  // FAVORITE TOGGLE 
  const toggleFav = () => {
    const user = auth.currentUser;

    if (!user) {
      iziToast.info({
        title: "Login required",
        message: "Please log in to use favorites",
        position: "topRight",
      });
      return;
    }

    const key = `favorites_${user.uid}`;
    const stored = JSON.parse(localStorage.getItem(key)) || [];

    let updated;

    // ZATEN VAR → REMOVE
    if (stored.includes(teacherId)) {
      updated = stored.filter((id) => id !== teacherId);

      localStorage.setItem(key, JSON.stringify(updated));
      setFav(false);

      iziToast.info({
        title: "Removed",
        message: "Removed from favorites",
        position: "topRight",
      });
    }
    // YOK → ADD
    else {
      updated = [...stored, teacherId];

      localStorage.setItem(key, JSON.stringify(updated));
      setFav(true);

      iziToast.success({
        title: "Added",
        message: "Teacher added to favorites ",
        position: "topRight",
      });
    }

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
