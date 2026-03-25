import { useEffect, useState } from "react";
import css from "./FavoritesPage.module.css";
import TeacherCard from "../components/TeacherCard";
import teachers from "../data/teachers.json";

export default function FavoritesPage() {
  const [favoriteTeachers, setFavoriteTeachers] = useState([]);

  useEffect(() => {
    const updateFavorites = () => {
      const storedFavorites =
        JSON.parse(localStorage.getItem("favorites")) || [];

     const filteredTeachers = teachers.filter((teacher) =>
       storedFavorites.includes(teacher.name + teacher.surname),
     );

      setFavoriteTeachers(filteredTeachers);
    };

    updateFavorites();

    window.addEventListener("favoritesChanged", updateFavorites);
    window.addEventListener("userChanged", updateFavorites);

    return () => {
      window.removeEventListener("favoritesChanged", updateFavorites);
      window.removeEventListener("userChanged", updateFavorites);
    };
  }, []);

  return (
    <section className={css.container}>
      {favoriteTeachers.length > 0 ? (
        <div className={css.list}>
          {favoriteTeachers.map((teacher) => (
            <TeacherCard key={teacher.id} teacher={teacher} />
          ))}
        </div>
      ) : (
        <p className={css.empty}>No favorite teachers yet.</p>
      )}
    </section>
  );
}
