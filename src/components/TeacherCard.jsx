import { useState, useEffect } from "react";
import css from "./TeacherCard.module.css";
import iziToast from "izitoast";
export default function TeacherCard({ teacher }) {
  const [fav, setFav] = useState(false);

  // SAYFA AÇILINCA FAVORİYİ OKU
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    if (stored.includes(teacher.id)) {
      setFav(true);
    }
  }, [teacher.id]);

  // FAVORİ DEĞİŞİNCE STORAGE GÜNCELLE
 const toggleFav = () => {
   const user = localStorage.getItem("user");

   if (!user) iziToast.info({
     title: "Login required",
     message: "Please log in to use favorites",
   });

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

      <p className={css.desc}>{teacher.experience}</p>

      <button className={css.readMore}>Read more</button>
    </div>
  );
}
